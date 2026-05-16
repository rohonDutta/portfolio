import nodemailer from "nodemailer";
import { errorResponse, successResponse, unauthorizedResponse } from "../../../lib/api";
import { isAuthenticated } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";
import Contact from "../../../models/Contact";

async function sendEmail({ name, email, subject, message }) {
  console.log("Attempting to send email...");
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS is missing in .env");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject || "New message"} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">New Contact Form Submission</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Subject:</td><td>${subject || "—"}</td></tr>
          </table>
          <hr style="margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Nodemailer error:", error);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return errorResponse("Name, email, and message are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse("Invalid email address");
    }

    const contact = await Contact.create({ name, email, subject, message });

    // Fire-and-forget email — don't block the response
    sendEmail({ name, email, subject, message }).catch(console.error);

    return successResponse({ message: "Message received!", id: contact._id }, 201);
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return errorResponse("Failed to send message", 500);
  }
}

export async function GET(req) {
  try {
    if (!isAuthenticated()) return unauthorizedResponse();
    await connectDB();

    const messages = await Contact.find().sort({ createdAt: -1 });
    return successResponse(messages);
  } catch (err) {
    return errorResponse("Failed to fetch messages", 500);
  }
}
