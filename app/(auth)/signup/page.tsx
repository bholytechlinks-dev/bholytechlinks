import Signup from "@/component/auth/Signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin signup",
};
const page = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default page;
