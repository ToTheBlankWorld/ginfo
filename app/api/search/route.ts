import { NextRequest, NextResponse } from "next/server";
import { searchStudents } from "@/lib/csvParser";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Check authentication
    const token = request.cookies.get("gitam_user_token");
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const queryName = searchParams.get("name");

    if (!queryName) {
      return NextResponse.json({
        students: [],
        message: "Please provide a search term",
      });
    }

    const students = searchStudents(queryName);

    return NextResponse.json({
      students: students.map((student) => ({
        "Registration no": student["Registration no"],
        Name: student.Name,
        Campus: student.Campus,
        College: student.College,
        Program: student.Program,
        Branch: student.Branch,
        Batch: student.Batch,
        Email: student.Email,
      })),
      count: students.length,
    });
  } catch (error: unknown) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Failed to search students" },
      { status: 500 }
    );
  }
}
