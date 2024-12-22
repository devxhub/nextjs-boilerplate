import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterForm() {
  return (
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
  );
}

export { RegisterForm };
