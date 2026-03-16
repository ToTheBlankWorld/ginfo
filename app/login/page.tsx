import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function LoginPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        {/* Background decoration */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl" />

        {/* Login Card */}
        <div className="clay-card relative p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🎓</div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">GITAM Portal</h1>
            <p className="text-sm text-gray-600">Student Information System</p>
          </div>

          <div className="mb-8 space-y-2 border-b-2 border-clay-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-600">
              Sign in with your GITAM Google account to access student records
            </p>
          </div>

          <GoogleSignInButton />

          <div className="mt-6 rounded-2xl bg-blue-50 p-4">
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Note:</span> Only users with @gitam.in or
              @student.gitam.edu email addresses are allowed to access this portal.
            </p>
          </div>

          {/* Features list */}
          <div className="mt-8 space-y-3 border-t-2 border-clay-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900">Portal Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Search students by name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>View student profiles and details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Secure GITAM authentication</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>GITAM University © 2024</p>
          <p>Student Information Portal v1.0</p>
        </div>
      </div>
    </main>
  );
}
