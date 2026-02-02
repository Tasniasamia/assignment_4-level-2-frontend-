"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useState } from "react";
import { Role } from "@/types";
import { roles } from "@/constants/role";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [role,setRole]=useState<Role>(roles.customer)
  const router=useRouter();
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const toatId = toast.loading("Loging User");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ⭐ mandatory
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
    const data=await res.json();
      console.log("data",data);
      if (data?.data?.user) {
        toast.success("Login Successfully", { id: toatId });
        router.refresh();
        return;
      }
      toast.error(data?.message, { id: toatId });
      return;
    } catch (err: any) {
      toast.error(err?.message, { id: toatId });
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
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
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password"name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit"className="cursor-pointer">Login</Button>
  
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
