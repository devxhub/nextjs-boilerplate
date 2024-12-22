import { LoginForm } from "@/components/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Component() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("dxh_access_token")?.value;

  if (authToken) redirect("/");

  return (
    <div className="bg-slate-50 grid place-content-center h-screen">
      <Card className="mx-auto max-w-sm w-[340px] sm:w-[380px]">
        <CardHeader className="space-y-1 pb-5">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          <p className="text-sm mt-4 text-center">
            <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
            <Link href="/auth/register" className="text-blue-800 font-medium">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
