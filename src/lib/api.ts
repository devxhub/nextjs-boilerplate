import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

const queryFn = async ({ queryKey }: { queryKey: string[] }) => {
  const [endpoint, params] = queryKey;
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value as string));
  }

  try {
    const response = await axiosInstance.get(url.toString());
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error:", axiosError.response?.data || axiosError.message);
  }
};

const mutationFn = async ({
  endpoint,
  body,
}: {
  endpoint: string;
  method?: "POST" | "PUT" | "DELETE";
  body: Record<string, unknown>;
}) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error:", axiosError.response?.data || axiosError.message);
  }
};

export { mutationFn, queryFn };
