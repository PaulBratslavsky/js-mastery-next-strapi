import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { getStrapiURL } from "@/lib/utils";

export async function GET(request: Request, { params }: { params: Promise<{ [key: string]: string }> }) {
  const resolvedParams = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");
  const provider = resolvedParams.provider;

  logger.info("User attempting to sign in", {
    provider,
    hasToken: !!token,
    userAgent: request.headers.get("user-agent"),
  });

  if (!token) {
    logger.warn("Sign in failed - no access token provided", { provider });
    return NextResponse.redirect(new URL("/", request.url));
  }

  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;
  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  try {
    logger.info("Calling authentication provider", {
      provider,
      callbackUrl: url.href,
    });

    const res = await fetch(url.href);
    const data = await res.json();

    if (!res.ok) {
      logger.error("Authentication provider returned error", {
        provider,
        status: res.status,
        statusText: res.statusText,
        error: data,
      });
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!data.jwt) {
      logger.error("Authentication failed - no JWT returned", {
        provider,
        response: data,
      });
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Use cookies() to READ the redirect URL (handles URL decoding properly)
    const cookieStore = await cookies();
    const redirectUrl = cookieStore.get("redirectUrl");
    const urlValue = redirectUrl?.value; // This will be properly decoded

    const requestUrl = new URL(request.url);
    const hostname = requestUrl.hostname;
    const isLocalhost = hostname === "localhost";

    // Create response and use NextResponse.cookies to SET the JWT cookie
    const response = NextResponse.redirect(new URL(urlValue ?? "/courses", request.url));
    
    response.cookies.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      domain: process.env.HOST ?? "localhost",
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    // Optional: Clear the redirect cookie after use
    response.cookies.delete("redirectUrl");

    logger.info("User successfully signed in", {
      provider,
      redirectTo: urlValue ?? "/courses",
      isLocalhost,
    });

    return response;
  } catch (error) {
    logger.error("Sign in process failed with exception", {
      provider,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.redirect(new URL("/", request.url));
  }
}