import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getUserMeLoader } from "@/lib/services/user";

// Define an array of protected routes
const protectedRoutes: string[] = [
  "/dashboard",
  "/dashboard/*",
  "/suggestions",
  "/suggestions/*",
  "/ask-question",
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  if (!path || protectedRoutes.length === 0) return false;
  return protectedRoutes.some((route) => {
    // For exact matches
    if (!route.includes("*")) {
      return path === route;
    }

    // For wildcard routes (e.g., /dashboard/*)
    const basePath = route.replace("/*", "");
    return path === basePath || path.startsWith(`${basePath}/`);
  });
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  console.log("************ middleware ************");
  console.log(user, "user");
  console.log("************************************");

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("redirect", currentPath);

    // Create the redirect response
    const response = NextResponse.redirect(redirectUrl);

    // Set the cookie on the response object, not the request
    response.cookies.set({
      name: "redirectUrl",
      value: currentPath,
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  }

  return NextResponse.next();
}

// Configure matcher for better performance
export const config = {
  matcher: [
    // Match /dashboard and any path under /dashboard
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/dashboard/:path*",
    "/ask-question",
  ],
};
