import Signin from "@/component/auth/Signin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin signin",
};
const page = () => {
  return (
    <div className="w-full">
      <Signin />
    </div>
  );
};

export default page;
