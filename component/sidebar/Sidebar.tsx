"use client";

import { Grid, LogOut } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-darkBlue/5 p-3">
      <div className="flex flex-col w-full">
        <Link
          href={"/admin"}
          className="w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue text-black flex flex-row items-center justify-start gap-3.5 cursor-pointer"
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Overview</p>
        </Link>
        <Link
          href={"/admin/message"}
          className="w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue text-black flex flex-row items-center justify-start gap-3.5 cursor-pointer"
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Messages</p>
        </Link>
        <Link
          href={"/admin/staff"}
          className="w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue text-black flex flex-row items-center justify-start gap-3.5 cursor-pointer"
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Staff</p>
        </Link>
      </div>

      <button className="w-full h-10 rounded-sm px-5 text-white bg-red-700 flex flex-row items-center justify-between gap-3.5 cursor-pointer">
        Logout <LogOut size={14} />
      </button>
    </div>
  );
};

export default Sidebar;
