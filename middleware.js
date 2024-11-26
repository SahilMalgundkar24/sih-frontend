import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();

  // Specific admin user ID redirect
  if (user.userId === "user_2pLWCLIpUzWB234JRjJtAAbJjUb") {
    // Check if the user is not already on the admin dashboard
    if (!req.nextUrl.pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
