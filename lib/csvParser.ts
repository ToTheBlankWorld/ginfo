import { readFileSync } from "fs";
import { join } from "path";
import Papa from "papaparse";

export interface Student {
  "Registration no": string;
  Name: string;
  Campus: string;
  College: string;
  Program: string;
  Branch: string;
  Batch: string;
  Email: string;
}

let cachedStudents: Student[] | null = null;

export function getStudents(): Student[] {
  if (cachedStudents) {
    return cachedStudents;
  }

  const csvPath = join(process.cwd(), "data", "students.csv");
  const csvContent = readFileSync(csvPath, "utf-8");

  const parsed = Papa.parse<Student>(csvContent, {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
  });

  cachedStudents = parsed.data.filter(
    (row) =>
      row["Registration no"] &&
      row.Name &&
      row.Email &&
      row["Registration no"].trim() !== "" &&
      row.Name.trim() !== ""
  );

  return cachedStudents;
}

export function searchStudents(name: string): Student[] {
  const students = getStudents();
  const searchTerm = name.toLowerCase().trim();

  if (!searchTerm) {
    return [];
  }

  return students.filter((student) =>
    student.Name.toLowerCase().includes(searchTerm)
  );
}

export function getStudentByRegistrationNo(registrationNo: string): Student | null {
  const students = getStudents();
  return (
    students.find(
      (student) =>
        student["Registration no"].toLowerCase() ===
        registrationNo.toLowerCase().trim()
    ) || null
  );
}
