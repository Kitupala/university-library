import React from "react";
import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";
import { render } from "@react-email/render";
import WelcomeEmail from "@/app/emails/WelcomeEmail";
import InactivityEmail from "@/app/emails/InactivityEmail";
import ActiveEmail from "@/app/emails/ActiveEmail";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome email
  await context.run("new-signup", async () => {
    const emailTemplate = await render(
      React.createElement(WelcomeEmail, { fullName }),
    );

    await sendEmail({
      email,
      subject: "Welcome to the BookWise!",
      html: emailTemplate,
    });
  });

  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        const emailTemplate = await render(
          React.createElement(InactivityEmail, { fullName }),
        );

        await sendEmail({
          email,
          subject: "Are you still there?",
          html: emailTemplate,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        const emailTemplate = await render(
          React.createElement(ActiveEmail, { fullName }),
        );
        await sendEmail({
          email,
          subject: "Welcome back!",
          html: emailTemplate,
        });
      });
    }

    await context.sleep("wait-for-1-month", THIRTY_DAYS_IN_MS);
  }
});
