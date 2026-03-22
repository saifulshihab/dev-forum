export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/user/:path*", "/questions/create", "/jobs/create"]
};
