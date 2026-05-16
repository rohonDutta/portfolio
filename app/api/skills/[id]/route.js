import { errorResponse, successResponse, unauthorizedResponse } from "../../../../lib/api";
import { isAuthenticated } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import Skill from "../../../../models/Skill";

export async function PUT(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const body = await req.json();
    const skill = await Skill.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!skill) return errorResponse("Skill not found", 404);
    return successResponse(skill);
  } catch (err) {
    return errorResponse(err.message || "Failed to update skill", 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const skill = await Skill.findByIdAndDelete(params.id);
    if (!skill) return errorResponse("Skill not found", 404);

    return successResponse({ message: "Skill deleted" });
  } catch (err) {
    return errorResponse("Failed to delete skill", 500);
  }
}
