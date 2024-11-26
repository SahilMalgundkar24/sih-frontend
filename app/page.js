import React from "react";
import Link from "next/link";
import { UserButton, UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl">Landing Page</h1>
        <UserButton showName />
        <Link href="/forms">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
            Form 1
          </button>
        </Link>
      </div>
    </>
  );
};

export default page;
