import { NextRequest } from "next/server";

async function forward(request: NextRequest, context: { params: Promise<{ all: string[] }> }) {
  const { all } = await context.params;
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  const target = `${backendUrl}/api/auth/${all.join("/")}${request.nextUrl.search}`;
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (key !== "content-encoding" && key !== "content-length" && key !== "set-cookie") {
      responseHeaders.append(key, value);
    }
  });

  for (const cookie of upstream.headers.getSetCookie?.() ?? []) {
    responseHeaders.append("set-cookie", cookie);
  }

  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
