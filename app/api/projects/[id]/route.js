import { errorResponse, successResponse, unauthorizedResponse } from "../../../../lib/api";
import { isAuthenticated } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import Project from "../../../../models/Project";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const project = await Project.findById(params.id);
    if (!project) return errorResponse("Project not found", 404);
    return successResponse(project);
  } catch (err) {
    return errorResponse("Failed to fetch project", 500);
  }
}

export async function PUT(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const body = await req.json();
    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) return errorResponse("Project not found", 404);
    return successResponse(project);
  } catch (err) {
    return errorResponse(err.message || "Failed to update project", 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const project = await Project.findByIdAndDelete(params.id);
    if (!project) return errorResponse("Project not found", 404);

    return successResponse({ message: "Project deleted" });
  } catch (err) {
    return errorResponse("Failed to delete project", 500);
  }
}
