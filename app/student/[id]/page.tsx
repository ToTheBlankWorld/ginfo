"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Navbar } from "@/components/Navbar";

interface Student {
  "Registration no": string;
  Name: string;
  Campus: string;
  College: string;
  Program: string;
  Branch: string;
  Batch: string;
  Email: string;
}

export default function StudentDetailsPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const registrationNo = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);

        const response = await axios.get<{ student?: Student }>(`/api/student/${registrationNo}`);

        if (response.data.student) {
          setStudent(response.data.student);
        } else {
          setError("Student not found");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          router.push("/login");
        } else {
          setError("Failed to fetch student details");
        }
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      try {
        const response = await axios.get<{ user?: { email: string } }>("/api/auth/verify");
        if (response.status === 200 && response.data.user?.email) {
          setUserEmail(response.data.user.email);
        }
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
    fetchStudent();
  }, [router, registrationNo]);

  if (loading) {
    return (
      <>
        <Navbar userEmail={userEmail} />
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-clay-50 to-clay-100">
          <div className="text-center">
            <div className="inline-block animate-spin text-5xl">⏳</div>
            <p className="mt-4 text-gray-600">Loading student details...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !student) {
    return (
      <>
        <Navbar userEmail={userEmail} />
        <main className="min-h-screen bg-gradient-to-br from-clay-50 to-clay-100 px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/search"
              className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              ← Back to Search
            </Link>
            <div className="clay-card p-8 text-center">
              <p className="text-2xl">❌</p>
              <p className="mt-4 text-lg text-gray-900">{error || "Student not found"}</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  const imageUrl = `https://doeresults.gitam.edu/photo/img.aspx?id=${student["Registration no"]}`;

  return (
    <>
      <Navbar userEmail={userEmail} />
      <main className="min-h-screen bg-gradient-to-br from-clay-50 to-clay-100 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/search"
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            ← Back to Search
          </Link>

          {/* Profile Card */}
          <div className="clay-card overflow-hidden">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-400" />

            <div className="px-6 pb-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
                <div className="-mt-16 mb-4 h-40 w-40 flex-shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-clay sm:mb-0">
                  <Image
                    src={imageUrl}
                    alt={student.Name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect fill='%23e5ddd5' width='160' height='160'/%3E%3Ctext x='80' y='80' text-anchor='middle' dy='.3em' fill='%238f7a66' font-size='60' font-weight='bold'%3E?%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="flex-1 sm:pb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{student.Name}</h1>
                  <p className="text-lg text-gray-600">{student.Program}</p>
                </div>
              </div>

              {/* Student Details Grid */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Registration Number
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student["Registration no"]}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">Campus</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student.Campus}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">Program</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student.Program}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">College</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student.College}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">Branch</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student.Branch}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-clay-50/50 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">Batch</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {student.Batch}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="mt-6 rounded-2xl bg-blue-50/50 p-4">
                <p className="text-xs font-semibold uppercase text-gray-500">Email</p>
                <a
                  href={`mailto:${student.Email}`}
                  className="mt-2 block text-lg font-semibold text-blue-600 hover:text-blue-700"
                >
                  {student.Email}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <Link
                  href="/search"
                  className="clay-button-primary flex-1 text-center"
                >
                  Back to Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
