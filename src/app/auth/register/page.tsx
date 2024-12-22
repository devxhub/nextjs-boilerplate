import { RegisterForm } from "@/components/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-slate-50 grid place-content-center h-screen">
      <Card className="mx-auto max-w-sm w-[340px] sm:w-[380px]">
        <CardHeader className="space-y-1 pb-5">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details to register to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <p className="text-sm mt-4 text-center">
            <span className="text-muted-foreground">Already have an account?</span>{" "}
            <Link href="/auth/login" className="text-blue-800 font-medium">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
