"use server";

import { GraphQLError } from "@/types";
import { cookies } from "next/headers";
import { refreshAccessToken } from "./refreshAccessToken";

interface GraphQLParams {
  query: string;
  variables?: Record<string, unknown>;
  additionalHeaders?: Record<string, string>;
}

async function graphqlAction<T = unknown>({
  query,
  variables = {},
  additionalHeaders = {},
}: GraphQLParams): Promise<T> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("dxh_access_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    "X-App-Type": "web",
    Authorization: accessToken ? `JWT ${accessToken}` : "",
    ...additionalHeaders,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();

      if (!accessToken) {
        throw new Error("Failed to refresh access token.");
      }

      headers.Authorization = `JWT ${accessToken}`;
      const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
      });

      if (!retryResponse.ok) {
        throw new Error(`Something went wrong: ${response.statusText}`);
      }

      const retryData = await retryResponse.json();
      if (retryData.errors) {
        throw new Error(
          `GraphQL error: ${retryData.errors.map((err: GraphQLError) => err.message).join(", ")}`
        );
      }

      return retryData.data;
    } catch (error) {
      console.error("Error during token refresh:", error);
      throw error;
    }
  }

  if (!response.ok) {
    throw new Error(`Something went wrong: ${response.statusText}`);
  }

  const responseBody = await response.json();

  if (responseBody.errors) {
    throw new Error(
      `GraphQL error: ${responseBody.errors.map((err: GraphQLError) => err.message).join(", ")}`
    );
  }

  return responseBody.data;
}

export { graphqlAction };
