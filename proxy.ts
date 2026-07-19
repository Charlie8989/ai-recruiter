import { auth } from "./lib/auth/server";

const protectedRoutes = [
  "/dashboard/:path*",
  "/all-interviews/:path*",
  "/scheduled-interview/:path*",
  "/settings/:path*",
];

export default auth.middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: protectedRoutes,
};
