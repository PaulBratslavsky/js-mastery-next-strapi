import { handleError } from "@/lib/handlers/error";
// import { logger } from "@/lib/logger";
import type { StrapiResponse } from "@/types/action-response";

import { getAuthToken } from "./api/services/get-token";

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

export async function fetchData<T>(url: string): Promise<StrapiResponse<T>> {
  const authToken = await getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // If Strapi returns a structured error, pass it back as-is
      // logger.warn("Strapi error response:", data);
      return data;
    }

    // logger.info("Response from Strapi", data);

    return data;
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      // logger.error("Request timed out");
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

    // logger.error("Network or unexpected error:", error);
    return handleError(error) as StrapiResponse<T>;
  }
}
