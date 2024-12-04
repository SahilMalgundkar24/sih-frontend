import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();

  // Exclude authentication routes from middleware logic
  const publicRoutes = ["/sign-in", "/sign-up", "/sign-out"];
  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect admin user to admin dashboard
  if (user.userId === "user_2pLWCLIpUzWB234JRjJtAAbJjUb") {
    if (!req.nextUrl.pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // Redirect unauthenticated users to sign-in
  if (!user.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
