import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  // Clear authentication cookies
  response.cookies.delete("gitam_user_token");
  response.cookies.delete("gitam_user_email");

  return response;
}
