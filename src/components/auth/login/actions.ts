"use server";

import { graphqlAction } from "@/actions";
import { loginMutation } from "@/graphql";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "./login-schema";
import { LoginActionState, Response } from "./type";

async function loginAction(prevState: unknown, formData: FormData): Promise<LoginActionState> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(rawFormData);

  if (!result.success) {
    const formattedErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        email: formattedErrors.email?.[0] || null,
        password: formattedErrors.password?.[0] || null,
      },
      data: rawFormData,
      response: null,
    };
  }

  try {
    const response = await graphqlAction<Promise<{ loginHr: Response }>>({
      query: loginMutation,
      variables: rawFormData,
    });

    if (response.loginHr.success) {
      const { token, refreshToken } = response.loginHr;

      const cookieStore = await cookies();

      cookieStore.set({
        name: "dxh_access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      cookieStore.set({
        name: "dxh_refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      redirect("/");
    }

    return {
      success: response.loginHr?.success,
      errors: null,
      data: rawFormData,
      response: response.loginHr,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        form: "Failed to login. Please try again.",
      },
      data: rawFormData,
      response: null,
    };
  }
}

export { loginAction };
