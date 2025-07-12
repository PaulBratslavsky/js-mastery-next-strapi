import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getStrapiURL } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
) {
  const resolvedParams = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const provider = resolvedParams.provider;
  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();

  const cookieStore = await cookies();
  const redirectUrl = cookieStore.get("redirectUrl");
  const urlValue = redirectUrl?.value


  const requestUrl = new URL(request.url);
  const hostname = requestUrl.hostname;
  const isLocalhost = hostname === 'localhost';

  cookieStore.set("jwt", data.jwt, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: "lax"
  });

  return NextResponse.redirect(new URL(urlValue ?? "/courses", request.url));
}