import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Routes that don't require authentication
  const publicRoutes = ["/login", "/"];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return undefined;
  }

  // Check if the user is authenticated
  const userToken = request.cookies.get("gitam_user_token");

  if (!userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return undefined;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
