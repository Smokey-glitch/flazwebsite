import { NextResponse } from "next/server";
import { z } from "zod";
import {
  verifyPassword,
  createSession,
  STUDIO_SESSION_COOKIE,
  STUDIO_SESSION_MAX_AGE_SECONDS,
} from "@/lib/studio-auth";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  const storedHash = process.env.STUDIO_PASSWORD_HASH;
  if (!storedHash) {
    return Response.json({ error: "Studio is not configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyPassword(parsed.data.password, storedHash)) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: STUDIO_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
