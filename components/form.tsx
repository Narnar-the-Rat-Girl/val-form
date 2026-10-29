import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Please input first name")
    .max(30, "too long, must be under 30 characters"),
  lastName: z
    .string()
    .min(2, "Please input last name")
    .max(30, "too long, must be under 30 characters"),
  email: z.email().trim(),
  password: z.string().min(8, "must be 8 characters"),
  comfirmPass: z.string(),
});

type signUpFormType = z.infer<typeof formSchema>;

export default function signUpForm() {
  return <div>hi</div>;
}
