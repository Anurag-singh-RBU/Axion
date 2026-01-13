"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"

const loginFormSchema = z.object({
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

export function LoginForm({className , ...props}){

  const methods = useForm({

    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },

  })
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-FT tracking-wider">Welcome Back</CardTitle>
          <CardDescription className="font-HG tracking-wide">
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...methods}>
          <form 
            onSubmit={methods.handleSubmit((values) => {
              console.log("Form submitted with values :", values);
            })}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" className="font-HG tracking-wide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"/>
                  </svg>
                  Login with Google
                </Button>
                <Button variant="outline" type="button" className="font-HG tracking-wide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="-ml-1">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.204.084 1.839 1.236 1.839 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.334-5.466-5.934 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.522.117-3.172 0 0 1.008-.322 3.3 1.23a11.44 11.44 0 0 1 3-.404c1.018.005 2.045.138 3 .404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.65.242 2.869.12 3.172.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.371.823 1.104.823 2.229v3.301c0 .322.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"/>
                  </svg>
                  Login with Github
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card font-HG tracking-wider">
                Or continue with
              </FieldSeparator>
              <FormField control={methods.control} name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-GS tracking-wider ml-2">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="Enter your email" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField control={methods.control} name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-end">
                      <FormLabel className="font-GS tracking-wider ml-2">Password</FormLabel>
                      <a
                        href="/forgot-password"
                        className="text-sm underline-offset-4 hover:underline font-HG">
                        Forgot your password ?
                      </a>
                    </div>
                    <FormControl>
                      <Input id="password" type="password" placeholder="Enter your password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <Field>
                <Button type="submit" className="font-HG tracking-wider">Login</Button>
                <FieldDescription className="text-center font-HG">
                  Do not have an account ? <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center font-HG leading-6">
        By clicking continue , you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
