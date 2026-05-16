import { errorResponse, successResponse, unauthorizedResponse } from "../../../../lib/api";
import { isAuthenticated } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import Contact from "../../../../models/Contact";

export async function PATCH(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();
    const body = await req.json();
    const msg = await Contact.findByIdAndUpdate(params.id, body, { new: true });
    if (!msg) return errorResponse("Message not found", 404);
    return successResponse(msg);
  } catch (err) {
    return errorResponse("Failed to update message", 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return successResponse({ message: "Deleted" });
  } catch (err) {
    return errorResponse("Failed to delete message", 500);
  }
}
