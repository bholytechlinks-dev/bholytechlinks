"use client";

import { Grid, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AddToast from "../heroui/AddToast";

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);

  const handeLogout = async () => {
    try {
      setLoading(true);
      const request = await fetch("/api/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.success) {
        AddToast(response.message as string, "success");
        return router.push("/");
      } else {
        return AddToast(response.message as string, "danger");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-darkBlue/5 p-3">
      <div className="flex flex-col gap-2 w-full">
        <Link
          href={"/"}
          className="flex items-center mb-10 gap-1 rounded-md bg-darkBlue p-1"
        >
          <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#112544] to-darkBlue border border-[#d4af37]/40 flex items-center justify-center shadow-inner">
            <span className="text-sm font-black text-[#d4af37]">B</span>
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wide text-white">
              BHOLYTECH<span className="text-[#d4af37]">LINKS</span>
            </span>
            <p className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-semibold">
              Business Center
            </p>
          </div>
        </Link>
        <Link
          href={"/admin"}
          className={`${pathName === "/admin" ? "bg-darkBlue/10 text-darkBlue" : "text-black bg-transparent"}  w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue flex flex-row items-center justify-start gap-3.5 cursor-pointer`}
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Overview</p>
        </Link>
        <Link
          href={"/admin/message"}
          className={`${pathName === "/admin/message" ? "bg-darkBlue/10 text-darkBlue" : "text-black bg-transparent"}  w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue flex flex-row items-center justify-start gap-3.5 cursor-pointer`}
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Messages</p>
        </Link>
        <Link
          href={"/admin/staff"}
          className={`${pathName === "/admin/staff" ? "bg-darkBlue/10 text-darkBlue" : "text-black bg-transparent"}  w-full h-12 rounded-sm px-5 hover:bg-darkBlue/10 hover:text-darkBlue flex flex-row items-center justify-start gap-3.5 cursor-pointer`}
        >
          <Grid className="text-black hover:text-darkBlue" size={12} />
          <p className="hover:text-darkBlue text-black">Staff</p>
        </Link>
      </div>

      {loading ? (
        <button
          disabled
          type="button"
          className="w-full h-10 rounded-sm px-5 text-white bg-red-700/65 flex flex-row items-center justify-between gap-3.5 cursor-not-allowed"
        >
          Processing...
        </button>
      ) : (
        <button
          onClick={() => handeLogout()}
          className="w-full h-10 rounded-sm px-5 text-white bg-red-700 flex flex-row items-center justify-between gap-3.5 cursor-pointer"
        >
          Logout <LogOut size={14} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
