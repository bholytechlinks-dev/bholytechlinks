import Staffs from "@/component/admin/staff/Staff";
import { Staff } from "@/type";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Staff",
};
const page = async () => {
  const request = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/staff`, {
    method: "GET",
    cache: "no-store",
  });
  const response = await request.json();

  const staff = response.data as Staff;
  console.log(staff);

  return (
    <div className="w-full">
      <Staffs staff={staff} />
    </div>
  );
};

export default page;
