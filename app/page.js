import React from "react";
import Link from "next/link";
import { UserButton, UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <>
      <div>
        <div className="w-full h-auto p-5 flex justify-between">
          <div className="flex justify-start items-center lg:mb-0 mb-5">
            <div className="">
              <img className="w-[70%]" src="/images/drdologo1.png" />
            </div>
            <div>
              <img className="w-[80%]" src="/images/drdologo2.png" />
            </div>
          </div>

          <div>
            <UserButton showName />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Landing Page</h1>
          <Link href="/forms">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-7">
              Form 1
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
