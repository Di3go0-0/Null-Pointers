import { z } from "zod";

enum Role {
  admin = "admin",
  teacher = "teacher",
  student = "student"
}

export const registerSchema = z
  .object({
    mail: z.string().email({ message: "Invalid email" }),
    name: z.string().min(1, { message: "Name is required" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" }),
    rol: z.nativeEnum(Role, { message: "Invalid role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.input<typeof registerSchema>;

export const loginSchema = z.object({
  mail: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export type LoginSchema = z.input<typeof loginSchema>;
