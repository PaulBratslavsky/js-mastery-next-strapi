"use client";
import AuthForm from "@/components/forms/auth-form";
import { SignInSchema } from "@/lib/validations";

export default function Signin() {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}
