import User from "../../../../models/User";
import { connectToDB } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { email: "Email and password are required" },
        { status: 400 }
      );
    }

    connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already registered" });
    }

    const newUser = await User.create({
      email,
      password,
    });

    if (newUser) {
      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Registration error");
    return NextResponse.json(
      { message: "Failed to register" },
      { status: 400 }
    );
  }
}
