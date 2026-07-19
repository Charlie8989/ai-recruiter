import { createNeonAuth } from "@neondatabase/auth/next/server";

const fallbackCookieSecret = "development-cookie-secret-change-me-32";
const thirtyDaysInSeconds = 60 * 60 * 24 * 30;

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || "http://localhost:3000",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || fallbackCookieSecret,
    sessionDataTtl: thirtyDaysInSeconds,
  },
});
