"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const Page = () => (
  <div>
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  </div>
);

export default Page;
