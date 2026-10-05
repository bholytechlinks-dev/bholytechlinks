import Staffs from "@/component/admin/staff/Staff";
import { AuthourizationAdmin } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Staff",
};

const page = async () => {
  const isAdmin = await AuthourizationAdmin();

  if (!isAdmin) {
    return redirect("/");
  }

  const staff = await prisma.admin.findMany();
  return (
    <div className="w-full">
      <Staffs staff={staff} />
    </div>
  );
};

export default page;
