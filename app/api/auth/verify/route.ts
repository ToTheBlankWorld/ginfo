import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { isAllowedEmail } from "@/lib/auth";

interface GoogleTokenInfo {
  aud?: string;
  email?: string;
  email_verified?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    // Verify token with Google
    const response = await axios.get<GoogleTokenInfo>(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );

    const { email } = response.data;

    if (!email) {
      return NextResponse.json(
        { message: "Email not found in token" },
        { status: 401 }
      );
    }

    if (!isAllowedEmail(email)) {
      return NextResponse.json(
        {
          message: `Only GITAM emails (@gitam.in or @student.gitam.edu) are allowed. Your email: ${email}`,
        },
        { status: 403 }
      );
    }

    // Create response with user data
    const userResponse = NextResponse.json({
      message: "Authentication successful",
      user: { email },
    });

    // Set secure cookie
    userResponse.cookies.set({
      name: "gitam_user_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    userResponse.cookies.set({
      name: "gitam_user_email",
      value: email,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return userResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = request.cookies.get("gitam_user_token");
    const email = request.cookies.get("gitam_user_email");

    if (!token || !email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: { email: email.value },
      authenticated: true,
    });
  } catch (error: unknown) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
