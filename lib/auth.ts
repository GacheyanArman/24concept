import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "the24-admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

function password() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "development" ? "24concept" : "");
}

function token() {
  const secret = process.env.ADMIN_COOKIE_SECRET || "development-secret-change-me";
  return createHash("sha256").update(`${password()}:${secret}`).digest("hex");
}

export function checkAdminPassword(input: string) {
  const expected = password();
  return Boolean(expected) && safeEqual(input, expected);
}

export function adminToken() {
  return token();
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value || "";
  return Boolean(value) && safeEqual(value, token());
}
