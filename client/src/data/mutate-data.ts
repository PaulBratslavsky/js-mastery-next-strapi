import { handleError } from "@/lib/handlers/error";
import { logger } from "@/lib/logger";
import { getStrapiURL } from "@/lib/utils";
import { StrapiResponse } from "@/types/action-response";

import { getAuthToken } from "./api/services/get-token";

type HTTPMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 8000 // 8 seconds default
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeout); // avoid memory leaks
  }
}

export async function mutateData<T = unknown, P = Record<string, unknown>>(
  method: HTTPMethod,
  path: string,
  payload?: P
): Promise<StrapiResponse<T>> {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl).toString();

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetchWithTimeout(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: method === "DELETE" ? undefined : JSON.stringify(payload ?? {}),
    });

    if (method === "DELETE") {
      return response.ok
        ? { data: true as T, success: true, status: response.status }
        : {
            error: {
              status: response.status,
              name: "Error",
              message: "Failed to delete resource",
            },
            success: false,
            status: response.status,
          };
    }

    const data = await response.json();

    if (!response.ok) {
      logger.warn("Strapi mutation error:", data);
      return {
        error: {
          status: response.status,
          name: data?.error?.name ?? "Error",
          message: data?.error?.message ?? "An error occurred",
        },
        success: false,
        status: response.status,
      };
    }

    return { data: data as T, success: true, status: response.status };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      logger.error("Request timed out");
      return {
        error: {
          status: 408,
          name: "TimeoutError",
          message: "The request timed out. Please try again.",
        },
        success: false,
        status: 408,
      } as StrapiResponse<T>;
    }

    logger.error("Network or unexpected error:", error);
    return handleError(error) as StrapiResponse<T>;
  }
}
