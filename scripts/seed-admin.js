/**
 * Run once to create the admin user:
 *   node scripts/seed-admin.js
 *
 * Requires MONGO_URI and ADMIN_EMAIL + ADMIN_PASSWORD in .env.local
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Manually load .env.local to avoid dependency on 'dotenv'
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...values] = line.split("=");
    if (key && values.length > 0) {
      process.env[key.trim()] = values.join("=").trim();
    }
  });
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  const admin = await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: hashed,
  });

  console.log("Admin created:", admin.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
