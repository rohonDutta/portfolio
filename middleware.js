import { NextResponse } from "next/server";

// Edge-compatible JWT verify (no Node.js modules)
async function verifyJWT(token) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret || !token) return null;

    const [headerB64, payloadB64, signatureB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !signatureB64) return null;

    // Import the secret key for HMAC
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Decode the signature
    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    // Verify
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const valid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!valid) return null;

    // Decode payload
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    );

    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("portfolio_admin_token")?.value;
    const decoded = await verifyJWT(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/") && request.method !== "GET") {
    const publicPostRoutes = ["/api/contact", "/api/auth"];
    const isPublic = publicPostRoutes.some((r) => pathname === r);

    if (!isPublic) {
      const token = request.cookies.get("portfolio_admin_token")?.value;
      const decoded = await verifyJWT(token);
      if (!decoded) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
