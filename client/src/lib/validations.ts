import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ error: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long." })
    .max(100, { error: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." })
    .max(30, { error: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      error: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z.email({ error: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long." })
    .max(100, { error: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      error: "Password must contain at least one number.",
    })
    .regex(/^[a-zA-Z0-9]/, {
      error: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Title is required." })
    .max(100, { error: "Title must be less than 130 characters." }),
  content: z
    .string()
    .min(10, { error: "Content is required." })
    .max(1000, { error: "Content must be less than 1000 characters." }),
  tags: z
    .array(
      z.object({
        documentId: z.string(),
        value: z.string().min(1).max(15),
        label: z.string(),
        id: z.number().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
    )
    .min(1, { message: "At least one tag is required." })
    .max(5, { message: "You can only add up to 5 tags." }),
});


