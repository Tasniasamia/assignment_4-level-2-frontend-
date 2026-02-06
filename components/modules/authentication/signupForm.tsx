"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth_client";
import { useState } from "react";
import { postSignUp } from "@/actions/user.action";
import { Role } from "@/types";
import { roles } from "@/constants/role";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const formSchema = z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters."),

      email: z.string().email("Please enter a valid email address."),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(32, "Password must be at most 32 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(
          /[@$!%*?&#]/,
          "Password must contain at least one special character."
        ),
      confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.", // Error message if the condition fails
      path: ["confirmPassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toatId = toast.loading("Creating User");
      try {
        const { name, email, password } = value;
        const {data,error}=await postSignUp({name:name,email:email,password:password,role:role});
       
        if (data?.success) {
          toast.success(`please check your email`, { id: toatId });
          return;
        }
        toast.error(error?.error?.message || error?.message || 'Failed to resister', { id: toatId });
        return;
      } catch (err: any) {
        toast.error(err?.message, { id: toatId });
      }
    },
  });


// const handleSocialSign = async () => {
//     const toastId = toast.loading("Continuing with Google...");
  
//     try {
//       const res = await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "http://localhost:3000",
//       });
  
//       if (res?.error) {
//         toast.error(res.error.message, { id: toastId });
//         return;
//       }
  
//       toast.success("Welcome!", { id: toastId });
//     } catch (err: any) {
//       toast.error(err?.message || "Something went wrong", { id: toastId });
//     }
//   };
  
const [role,setRole]=useState<Role>(roles.customer)

  return (
    <Card {...props}>
         <CardHeader>
      <CardTitle className="md:text-3xl text-xl text-center pt-3">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information below to create your account
        </CardDescription>
        <div className="flex justify-center pt-3">
        <button
              onClick={()=>{setRole(roles.customer)}}
              className={`w-fit  px-4 py-2 rounded-lg   cursor-pointer ${role === 'customer'?'bg-primary text-primary-foreground':'bg-white text-primary border-primary'} h-12 text-base font-semibold`}
            >
              Customer
            </button>      
            <button
              onClick={()=>{setRole(roles.provider)}}
              className={`w-fit  px-4 py-2 rounded-lg  cursor-pointer ${role === 'provider'?'bg-primary text-primary-foreground':'bg-white text-primary border-primary'} h-12 text-base font-semibold`}
            >
              Provider
            </button>         
            </div>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="John Doe"
                      autoComplete="off"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Password"
                      autoComplete="off"
                      type="password"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Confirm Password"
                      autoComplete="off"
                      type="password"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                );
              }}
            />
            <Button type="submit" form="signup-form" className="cursor-pointer">
              Create Account
            </Button>
            <FieldGroup>
              <Field>
                {/* <Button
                  variant="outline"
                  type="button"
                  onClick={handleSocialSign}
                >
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
