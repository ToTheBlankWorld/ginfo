import { NextRequest, NextResponse } from "next/server";
import { getStudentByRegistrationNo } from "@/lib/csvParser";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Check authentication
    const token = request.cookies.get("gitam_user_token");
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const student = getStudentByRegistrationNo(id);

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      student: {
        "Registration no": student["Registration no"],
        Name: student.Name,
        Campus: student.Campus,
        College: student.College,
        Program: student.Program,
        Branch: student.Branch,
        Batch: student.Batch,
        Email: student.Email,
      },
    });
  } catch (error: unknown) {
    console.error("Student details error:", error);
    return NextResponse.json(
      { message: "Failed to fetch student details" },
      { status: 500 }
    );
  }
}
