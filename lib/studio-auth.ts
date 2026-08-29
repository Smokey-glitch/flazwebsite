import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";

export const STUDIO_SESSION_COOKIE = "studio_session";
export const STUDIO_SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const KEYLEN = 64;
const SCRYPT_OPTS = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, KEYLEN, SCRYPT_OPTS);
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const hash = Buffer.from(hashHex, "hex");
  const key = scryptSync(password, Buffer.from(saltHex, "hex"), hash.length, SCRYPT_OPTS);
  return key.length === hash.length && timingSafeEqual(key, hash);
}

function sign(data: string): string {
  const secret = process.env.STUDIO_SESSION_SECRET;
  if (!secret) throw new Error("STUDIO_SESSION_SECRET is not set");
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSession(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString(
    "base64url"
  );
  return `${payload}.${sign(payload)}`;
}

export function verifySession(cookie: string | undefined | null): boolean {
  if (!cookie) return false;
  const [payload, sig] = cookie.split(".");
  if (!payload || !sig) return false;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}
