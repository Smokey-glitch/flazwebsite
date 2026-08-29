import { NextResponse } from "next/server";
import { STUDIO_SESSION_COOKIE } from "@/lib/studio-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(STUDIO_SESSION_COOKIE);
  return response;
}
