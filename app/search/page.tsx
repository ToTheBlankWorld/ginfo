"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { SearchBar } from "@/components/SearchBar";
import { StudentCard } from "@/components/StudentCard";
import { Navbar } from "@/components/Navbar";

interface Student {
  "Registration no": string;
  Name: string;
  Program: string;
  Branch: string;
  Campus: string;
  Email: string;
  College: string;
  Batch: string;
}

export default function SearchPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    // Check authentication
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
  }, [router]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setError(null);

    if (!query.trim()) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{ students?: Student[]; message?: string }>(
        `/api/search?name=${encodeURIComponent(query)}`
      );

      if (response.data.students) {
        setStudents(response.data.students);
        if (response.data.students.length === 0) {
          setError("No students found. Try a different name.");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      } else {
        setError("Failed to search students. Please try again.");
      }
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      <Navbar userEmail={userEmail} />
      <main className="min-h-screen bg-gradient-to-br from-clay-50 to-clay-100 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Student Search Portal
            </h1>
            <p className="text-gray-600">
              Search for GITAM University students by name
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          {/* Results */}
          <div>
            {error && (
              <div className="clay-card mb-6 border-l-4 border-red-500 bg-red-50/50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {loading && (
              <div className="clay-card space-y-4 p-8 text-center">
                <div className="inline-block animate-spin text-4xl">⏳</div>
                <p className="text-gray-600">Searching for students...</p>
              </div>
            )}

            {!loading && students.length > 0 && (
              <div className="space-y-6">
                <p className="text-sm font-semibold text-gray-600">
                  Found {students.length} {students.length === 1 ? "student" : "students"}
                </p>
                <div className="space-y-6">
                  {students.map((student) => (
                    <StudentCard
                      key={student["Registration no"]}
                      registrationNo={student["Registration no"]}
                      name={student.Name}
                      program={student.Program}
                      branch={student.Branch}
                      campus={student.Campus}
                    />
                  ))}
                </div>
              </div>
            )}

            {!loading && searchQuery && students.length === 0 && !error && (
              <div className="clay-card p-8 text-center">
                <p className="text-2xl">🔍</p>
                <p className="mt-2 text-gray-600">Enter a student name to search</p>
              </div>
            )}

            {!searchQuery && (
              <div className="clay-card p-8 text-center">
                <p className="text-4xl">🎓</p>
                <p className="mt-4 text-gray-900">Welcome to GITAM Student Portal</p>
                <p className="mt-2 text-sm text-gray-600">
                  Use the search bar above to find students by their name
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
