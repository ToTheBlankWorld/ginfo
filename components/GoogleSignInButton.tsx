"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export function GoogleSignInButton(): React.ReactElement {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post("/api/auth/verify", {
          token: codeResponse.access_token,
        });

        if (response.status === 200) {
          router.push("/search");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Authentication failed. Please try again.");
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    },
    onError: () => {
      setError("Failed to sign in with Google. Please try again.");
    },
    flow: "implicit",
  });

  return (
    <div className="w-full">
      <button
        onClick={() => login()}
        disabled={loading}
        className="clay-button-primary w-full gap-3 disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="inline-block animate-spin">⏳</span>
            Signing in...
          </>
        ) : (
          <>
            <span className="text-xl">🔐</span>
            Sign In with Google
          </>
        )}
      </button>
      {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}
