export interface GoogleTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
}

export function isAllowedEmail(email: string): boolean {
  const allowedDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(",") || [
    "gitam.in",
    "student.gitam.edu",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return allowedDomains.includes(domain);
}

export function extractEmailDomain(email: string): string {
  return email.split("@")[1] || "";
}

export function decodeJWT(token: string): GoogleTokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Decode the payload (second part)
    const decodedPayload = Buffer.from(parts[1], "base64").toString("utf-8");
    return JSON.parse(decodedPayload) as GoogleTokenPayload;
  } catch {
    return null;
  }
}
