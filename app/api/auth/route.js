import { cookies } from "next/headers";
import { errorResponse, successResponse } from "../../../lib/api";
import { COOKIE_NAME_EXPORT, signToken } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";
import Admin from "../../../models/Admin";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Email and password are required");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return errorResponse("Invalid credentials", 401);

    const valid = await admin.comparePassword(password);
    if (!valid) return errorResponse("Invalid credentials", 401);

    const token = signToken({ id: admin._id, email: admin.email });

    // Set HTTP-only cookie
    cookies().set(COOKIE_NAME_EXPORT, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return successResponse({ message: "Logged in successfully" });
  } catch (err) {
    console.error("[POST /api/auth/login]", err);
    return errorResponse("Login failed", 500);
  }
}

export async function DELETE() {
  cookies().delete(COOKIE_NAME_EXPORT);
  return successResponse({ message: "Logged out" });
}
