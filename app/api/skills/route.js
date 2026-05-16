import { errorResponse, successResponse, unauthorizedResponse } from "../../../lib/api";
import { isAuthenticated } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";
import Skill from "../../../models/Skill";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, category: 1 });

    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return successResponse({ skills, grouped });
  } catch (err) {
    return errorResponse("Failed to fetch skills", 500);
  }
}

export async function POST(req) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const body = await req.json();
    const { name, category, level, icon, order } = body;

    if (!name || !category) return errorResponse("Name and category are required");

    const skill = await Skill.create({ name, category, level, icon, order });
    return successResponse(skill, 201);
  } catch (err) {
    return errorResponse(err.message || "Failed to create skill", 500);
  }
}
