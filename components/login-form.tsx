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
import { signIn } from "@/lib/auth_client"
import axios from "axios";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    await axios.post(`http://localhost:5750/api/auth/sign-in/email`, {
    email:email,
    password:password
    },{
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
    .then(function (response:any) {
      if(response?.data?.twoFactorRedirect){

       alert('Please verify your otp')
      }
    })
    .catch(function (error:any) {
      alert(error?.message);
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password"name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {/* <Button onClick={signIn} className="cursor-pointer" variant="outline" type="button">
                  Login with Google
                </Button> */}
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
