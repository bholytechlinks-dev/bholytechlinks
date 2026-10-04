import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("bholy")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { payload } = await jose.jwtVerify(token, SECRET);

    if (!payload) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const id = payload.id as string;
    const role = payload.role as string;
    if (!id) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!role) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (role !== "Admin" && role !== "Staff" && role !== "User") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
