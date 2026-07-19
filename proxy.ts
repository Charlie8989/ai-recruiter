import { auth } from "./lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/all-interviews/:path*",
    "/scheduled-interview/:path*",
    "/settings/:path*",
  ],
};
