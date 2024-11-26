import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignIn signUpUrl="/sign-up" />;
};

export default page;
