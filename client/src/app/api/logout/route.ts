import { type NextRequest, NextResponse } from "next/server";

import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const hostname = new URL(request.url).hostname;
  const isLocalhost = hostname === "localhost";
  const domain = process.env.HOST ?? "localhost";

  logger.info("User attempting to log out", {
    hostname,
    isLocalhost,
    domain,
    userAgent: request.headers.get("user-agent"),
  });

  // Create the redirect response
  const response = NextResponse.redirect(new URL("/", request.url));

  try {
    // Clear the JWT cookie
    response.cookies.set("jwt", "", {
      maxAge: 0,
      path: "/",
      domain: domain,
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    // Also clear user cookie if it exists
    response.cookies.set("user", "", {
      maxAge: 0,
      path: "/",
      domain: domain,
      httpOnly: false,
      secure: !isLocalhost,
      sameSite: "lax",
    });

    logger.info("User successfully logged out", {
      hostname,
      domain,
      cookiesCleared: ["jwt", "user"],
    });

    return response;
  } catch (error) {
    logger.error("Logout process failed", {
      hostname,
      domain,
      error: error instanceof Error ? error.message : String(error),
    });

    // Still return the response even if logging fails
    return response;
  }
}

// Also support POST method
export async function POST(request: NextRequest) {
  return GET(request);
}
