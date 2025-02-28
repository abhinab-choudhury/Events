import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (!session) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (session && pathname === "/account") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/settings", "/new/(.*)"],
};
