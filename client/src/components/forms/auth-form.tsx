"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/constants/routes"
import { SignInSchema, SignUpSchema } from "@/lib/validations"

type SignInData = z.infer<typeof SignInSchema>
type SignUpData = z.infer<typeof SignUpSchema>

interface AuthFormProps {
  formType: "SIGN_IN" | "SIGN_UP"
  onSubmit: (data: SignInData | SignUpData) => Promise<{ success: boolean }>
  defaultValues: SignInData | SignUpData
  schema: z.ZodSchema<SignInData | SignUpData>
}

function AuthForm({ formType, onSubmit }: AuthFormProps) {
  const isSignIn = formType === "SIGN_IN"
  const schema = isSignIn ? SignInSchema : SignUpSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isSignIn ? { email: "", password: "" } : { name: "", email: "", password: "" },
  })

  const handleSubmit = async (data: SignInData | SignUpData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const buttonText = isSignIn ? "Sign In" : "Sign Up"
  const loadingText = isSignIn ? "Signing In..." : "Signing Up..."

  const getFieldLabel = (fieldName: string) => {
    switch (fieldName) {
      case "email":
        return "Email Address"
      case "name":
        return "Full Name"
      case "password":
        return "Password"
      default:
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    }
  }

  const getFieldType = (fieldName: string) => {
    switch (fieldName) {
      case "password":
        return "password"
      case "email":
        return "email"
      default:
        return "text"
    }
  }

  const fields = isSignIn ? ["email", "password"] : ["name", "email", "password"]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        {fields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as keyof (SignInData | SignUpData)}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">{getFieldLabel(fieldName)}</FormLabel>
                <FormControl>
                  <Input
                    type={getFieldType(fieldName)}
                    placeholder={getFieldLabel(fieldName)}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting ? loadingText : buttonText}
        </Button>

        <div className="text-center">
          {isSignIn ? (
            <p className="paragraph-regular text-dark400_light700">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="paragraph-regular text-dark400_light700">
              Already have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
