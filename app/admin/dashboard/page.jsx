import { UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <>
      <h1>DashBoooo</h1>
      <UserButton showName />
    </>
  );
};

export default page;
