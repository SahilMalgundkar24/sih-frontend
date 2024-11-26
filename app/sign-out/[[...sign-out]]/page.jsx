"use client";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return <SignInButton />;
  }

  return <SignOutButton signOutOptions={{ sessionId }} />;
}
