"use server";

import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  const headersInstance = await headers();
  const ipAddress = headersInstance.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ipAddress);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log("Sign in error", error);
    return { success: false, error: "Sign in error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  const headersInstance = await headers();
  const ipAddress = headersInstance.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ipAddress);

  if (!success) return redirect("/too-fast");

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId: universityId,
      universityCard: universityCard,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log("Signup error", error);
    return { success: false, error: "Signup error" };
  }
};
