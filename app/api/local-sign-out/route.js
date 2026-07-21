import { NextResponse } from "next/server";

const NEON_AUTH_COOKIE_PREFIX = "__Secure-neon-auth";
const FALLBACK_COOKIE_NAMES = [
  "__Secure-neon-auth.session_token",
  "__Secure-neon-auth.session_data",
  "__Secure-neon-auth.dont_remember",
  "__Secure-neon-auth.local.session_data",
  "__Secure-neon-auth.session_challange",
];

export async function POST(request) {
  const response = NextResponse.json({ ok: true });
  const cookieNames = new Set(FALLBACK_COOKIE_NAMES);

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(NEON_AUTH_COOKIE_PREFIX)) {
      cookieNames.add(cookie.name);
    }
  });

  cookieNames.forEach((name) => {
    response.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  });

  return response;
}
