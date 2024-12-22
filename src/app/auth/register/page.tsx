import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-slate-50 grid place-content-center h-screen">
      <Card className="mx-auto max-w-sm w-[340px] sm:w-[380px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your details to register to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" placeholder="demo@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
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
