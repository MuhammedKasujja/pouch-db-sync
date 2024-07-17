import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().min(18, "Must be at least 18 years old"),
  email: z.string().email("Invalid email address"),
});

export type User = z.infer<typeof userSchema>;
