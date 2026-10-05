import Overview from "@/component/admin/overview/Overview";
import FadeLoading from "@/component/loading/FadeLoading";
import { AuthourizationCheck } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Overview",
};
const page = async () => {
  const authourise = await AuthourizationCheck();

  if (!authourise) {
    return redirect("/");
  }
  const [message, staff] = await Promise.all([
    await prisma.message.findMany(),
    await prisma.admin.findMany(),
  ]);

  if (!message || !staff) {
    return (
      <div className="w-full">
        <FadeLoading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Overview messages={message} staff={staff} />
    </div>
  );
};

export default page;
