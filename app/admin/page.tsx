import Overview from "@/component/admin/overview/Overview";
import FadeLoading from "@/component/loading/FadeLoading";
import { Messages, Staff } from "@/type";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Overviews",
};
const page = async () => {
  const [messageReq, staffReq] = await Promise.all([
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/message`, {
      method: "GET",
      cache: "no-store",
    }),
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/staff`, {
      method: "GET",
      cache: "no-store",
    }),
  ]);
  const messageRes = await messageReq.json();
  const staffRes = await staffReq.json();

  const message = messageRes.data as Messages;
  const staff = staffRes.data as Staff;
  console.log(message, staff);

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
