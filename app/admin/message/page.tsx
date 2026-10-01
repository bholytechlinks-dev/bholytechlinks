import Message from "@/component/admin/message/Messages";
import { Messages } from "@/type";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messages",
};
const page = async () => {
  const request = await fetch(`${process.env.API_URL}/api/message`, {
    method: "GET",
    cache: "no-store",
  });
  const response = await request.json();

  const messages = response.data as Messages;
  return (
    <div className="w-full">
      <Message messages={messages} />
    </div>
  );
};

export default page;
