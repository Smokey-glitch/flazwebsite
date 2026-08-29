// Prints a STUDIO_PASSWORD_HASH value for a chosen password.
// Usage: node scripts/hash-studio-password.mjs "the-password"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-studio-password.mjs "the-password"');
  process.exit(1);
}

const KEYLEN = 64;
const SCRYPT_OPTS = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

const salt = randomBytes(16);
const key = scryptSync(password, salt, KEYLEN, SCRYPT_OPTS);
const hash = `${salt.toString("hex")}:${key.toString("hex")}`;

console.log("\nSTUDIO_PASSWORD_HASH=" + hash + "\n");
console.log("Paste that whole line into .env.local and into Vercel's environment variables.");
