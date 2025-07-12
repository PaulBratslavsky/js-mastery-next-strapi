import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Create the redirect response
  const response = NextResponse.redirect(new URL("/", request.url))

  // Get the hostname for localhost check
  const hostname = new URL(request.url).hostname
  const isLocalhost = hostname === "localhost"

  // Use the same HOST environment variable as when setting the cookie
  const domain = process.env.HOST ?? "localhost"

  console.log("Clearing cookie with domain:", domain)

  // Clear the JWT cookie
  response.cookies.set("jwt", "", {
    maxAge: 0,
    path: "/",
    domain: domain,
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: "lax",
  })

  // Also clear user cookie if it exists
  response.cookies.set("user", "", {
    maxAge: 0,
    path: "/",
    domain: domain,
    httpOnly: false,
    secure: !isLocalhost,
    sameSite: "lax",
  })

  return response
}

// Also support POST method
export async function POST(request: NextRequest) {
  return GET(request)
}