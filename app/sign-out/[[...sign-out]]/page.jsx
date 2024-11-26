"use client";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return <SignInButton />;
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <SignOutButton signOutOptions={{ sessionId }} />;
      </div>
    </>
  );
}
