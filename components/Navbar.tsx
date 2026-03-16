"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export function Navbar({
  userEmail,
}: {
  userEmail?: string;
}): React.ReactElement {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-clay-200 bg-white/80 backdrop-blur-clay shadow-clay">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/search" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <span>🎓</span>
          <span>GITAM Portal</span>
        </Link>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden text-sm text-gray-600 sm:inline">
              {userEmail}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="clay-button-secondary"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
