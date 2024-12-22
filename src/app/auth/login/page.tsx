import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-slate-50 grid place-content-center h-screen">
      <Card className="mx-auto max-w-sm w-[340px] sm:w-[380px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="demo@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>
            <div className="pt-1 flex items-center justify-between gap-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-blue-800">
                Forgot password?
              </Link>
            </div>
            <div className="pt-1">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
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
