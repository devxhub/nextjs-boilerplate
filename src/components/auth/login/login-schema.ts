import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Message must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export { loginSchema };
