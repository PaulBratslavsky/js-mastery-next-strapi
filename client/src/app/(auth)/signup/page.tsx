"use client";
import AuthForm from "@/components/forms/auth-form";
import { SignUpSchema } from "@/lib/validations";

export default function Signup() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", username: "",  }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}
