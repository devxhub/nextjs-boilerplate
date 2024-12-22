"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";
import { loginAction } from "./actions";
import { loginSchema } from "./login-schema";

function LoginForm() {
  const initialState = {
    success: false,
    errors: null,
    data: null,
    response: null,
  };

  const [state, formAction] = useActionState(loginAction, initialState);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (name: keyof typeof loginSchema.shape, value: string) => {
    try {
      loginSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: (error as any).errors[0].message,
      }));
    }
  };

  const { message_en } = JSON.parse(state.response?.response || "{}") || {};

  useEffect(() => {
    if (state.response?.success === false) {
      toast.error(message_en);
    } else {
      toast.success(message_en);
    }
  }, [state.response, message_en]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="demo@example.com"
            defaultValue={state.data?.email}
            onChange={(e) => validateField("email", e.target.value)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
        </div>
        {(errors.email || state.errors?.email) && (
          <p id="email-error" className="text-sm text-red-500">
            {errors.email || state.errors?.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            defaultValue={state.data?.password}
            onChange={(e) => validateField("password", e.target.value)}
            aria-describedby={state.errors?.password ? "password-error" : undefined}
          />
        </div>
        {(errors.password || state.errors?.password) && (
          <p id="password-error" className="text-sm text-red-500">
            {errors.password || state.errors?.password}
          </p>
        )}
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
        <SubmitButton />
      </div>
    </form>
  );
}

export { LoginForm };
