import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/configs/db.config";
import User from "@/models/userSchema.models";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Validate input
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await User.findOne({ email: emailLower });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await User.create({
      name: name.trim(),
      email: emailLower,
      password: hashedPassword,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=6366f1&color=fff&size=100`,
      authProvider: "credentials",
      isVerified: true,
    });

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
