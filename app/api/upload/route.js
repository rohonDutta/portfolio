import { NextResponse } from "next/server";
import { errorResponse, unauthorizedResponse } from "../../../lib/api";
import { isAuthenticated } from "../../../lib/auth";
import imagekit from "../../../lib/imagekit";

export async function POST(req) {
  try {
    // 1. Check Auth (Admin Only)
    if (!isAuthenticated()) {
      return unauthorizedResponse();
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    // 3. Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Upload to ImageKit
    const response = await imagekit.upload({
      file: buffer, // required
      fileName: file.name, // required
      folder: "/portfolio", // optional
    });

    // 5. Return success with ImageKit response
    return NextResponse.json({
      success: true,
      data: {
        url: response.url,
        fileId: response.fileId,
        name: response.name,
      },
    });
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return errorResponse(err.message || "Upload failed", 500);
  }
}
