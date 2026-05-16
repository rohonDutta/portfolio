import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "portfolio_admin_token";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromCookies() {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export function isAuthenticated() {
  const token = getTokenFromCookies();
  if (!token) return false;
  const decoded = verifyToken(token);
  return !!decoded;
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
