"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function refreshAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("dxh_refresh_token")?.value;

  if (!refreshToken) {
    cookieStore.delete("dxh_access_token");
    cookieStore.delete("dxh_refreshToken");
    redirect("/auth/login");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/graph/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: refreshToken, variables: { refreshToken } }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token.");
  }

  const data = await response.json();
  const { token, refreshToken: newRefreshToken } = data?.refreshToken || {};

  const cookieStoreMutator = await cookies();

  cookieStoreMutator.set({
    name: "dxh_access_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStoreMutator.set({
    name: "dxh_refresh_token",
    value: newRefreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return token;
}

export { refreshAccessToken };
