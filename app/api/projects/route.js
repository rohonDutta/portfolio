import { errorResponse, successResponse, unauthorizedResponse } from "../../../lib/api";
import { isAuthenticated } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";
import Project from "../../../models/Project";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const query = featured === "true" ? { featured: true } : {};
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return successResponse(projects);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return errorResponse("Failed to fetch projects", 500);
  }
}

export async function POST(req) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();

    await connectDB();
    const body = await req.json();

    const { title, description, tech, github, live, image, featured, order, longDescription } = body;

    if (!title || !description) {
      return errorResponse("Title and description are required");
    }

    const project = await Project.create({
      title,
      description,
      longDescription,
      tech: tech || [],
      github,
      live,
      image,
      featured: featured || false,
      order: order || 0,
    });

    return successResponse(project, 201);
  } catch (err) {
    console.error("[POST /api/projects]", err);
    return errorResponse(err.message || "Failed to create project", 500);
  }
}
