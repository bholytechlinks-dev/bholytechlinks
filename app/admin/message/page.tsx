import Message from "@/component/admin/message/Messages";
import { AuthourizationCheck } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Messages",
};
const page = async () => {
  const user = await AuthourizationCheck();

  if (!user) {
    return redirect("/");
  }
const messages = await prisma.message.findMany();
  return (
    <div className="w-full">
      <Message messages={messages} />
    </div>
  );
};

export default page;
