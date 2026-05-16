import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    longDescription: {
      type: String,
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      trim: true,
    },
    live: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
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

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
