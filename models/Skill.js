import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "AI/ML", "Other"],
      default: "Other",
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 80,
    },
    icon: {
      type: String, // emoji or icon identifier
      default: "⚡",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
