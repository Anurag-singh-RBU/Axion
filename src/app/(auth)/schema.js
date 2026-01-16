import { z } from "zod"

export const loginFormSchema = z.object({

  email: z.string().min(1, "Email is required").email("Invalid email address format").max(320, "Email is too long"),
  password: z.string().min(8 , "Password must be at least 8 characters").max(128 , "Password must be no more than 128 characters")
  .refine((val) => !/\s/.test(val), {
  message: "Password cannot contain spaces"
  }).refine(
  (val) =>
    /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val),
  {
    message: "Password must contain upper and lower case letters , a number and a special character",
  }
  ),
    
});

export const signupFormSchema = z.object({

  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be no more than 32 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address format").max(320, "Email is too long"),
  password: z.string().min(8 , "Password must be at least 8 characters").max(128 , "Password must be no more than 128 characters")
  .refine((val) => !/\s/.test(val), {
    message: "Password cannot contain spaces"
  }).refine(
    (val) =>
      /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val),
    {
      message: "Password must contain upper and lower case letters , a number and a special character",
    }
  ),

});