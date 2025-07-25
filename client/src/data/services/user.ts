import { getStrapiURL } from "@/lib/utils";
import { StrapiUserData } from "@/types";

import { getAuthToken } from "./get-token";

type GetUserMeLoaderResponse =
  | { ok: true; data: StrapiUserData; error: null }
  | { ok: false; data: null; error: unknown };

export async function getUserMeLoader(): Promise<GetUserMeLoaderResponse> {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/users/me", baseUrl);
  const authToken = await getAuthToken();

  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    // console.dir(data, { depth: null })
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

