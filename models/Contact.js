import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject too long"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [2000, "Message too long"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
