import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "name must be 3 characters long").optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "password must be atleast 5 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "password must be atleast 5 characters long"),
});
