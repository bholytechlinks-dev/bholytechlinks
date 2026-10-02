import Overview from "@/component/admin/overview/Overview";
import { Messages, Staff } from "@/type";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Overviews",
};
const page = async () => {
  const [messageReq, staffReq] = await Promise.all([
    await fetch(`${process.env.API_URL}/api/message`, {
      method: "GET",
      cache: "no-store",
    }),
    await fetch(`${process.env.API_URL}/api/staff`, {
      method: "GET",
      cache: "no-store",
    }),
  ]);
  const messageRes = await messageReq.json();
  const staffRes = await staffReq.json();

  const message = messageRes.data as Messages;
  const staff = staffRes.data as Staff;
  // if (messages) {
  //   return (
  //     <div>
  //       <h1>Loading</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full">
      <Overview messages={message} staff={staff} />
    </div>
  );
};

export default page;
