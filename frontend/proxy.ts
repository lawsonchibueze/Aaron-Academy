import { NextRequest, NextResponse } from "next/server";

type SessionResponse = { user?: { role?: string } } | null;

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  let session: SessionResponse = null;

  try {
    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
      cache: "no-store",
    });
    if (response.ok) {
      session = (await response.json()) as SessionResponse;
    }
  } catch {
    session = null;
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "auth-required");
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session.user?.role !== "ADMIN") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "not-admin");
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
