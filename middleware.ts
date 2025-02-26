import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });

  // Allow unauthenticated access to /account to prevent infinite redirects
  if (!session && request.nextUrl.pathname !== "/account") {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/settings"],
};
