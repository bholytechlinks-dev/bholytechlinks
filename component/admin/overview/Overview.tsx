"use client";

import DeleteMessageModal from "@/component/heroui/DeleteMessageModal";

import { Messages, Staff } from "@/type";
import Link from "next/link";

const Overview = ({
  messages,
  staff,
}: {
  messages: Messages;
  staff: Staff;
}) => {
  const attendedMessageCount = messages.filter(
    (eachM) => eachM.attendTo === true,
  ).length;
  const yetAttendedMessageCount = messages.filter(
    (eachM) => eachM.attendTo === false,
  ).length;
  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-3xl text-darkBlue font-bold">Overview</h1>
        <p className="text-sm text-darkBlue/65">
          Messages and staff details around your brands
        </p>
      </div>

      <div className="w-full gap-5 flex md:flex-row flex-col">
        <div className="w-full flex flex-col items-start p-3 border border-darkBlue/15 rounded hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
          <p className="text-sm text-darkBlue/65">All Messages</p>
          <h1 className="text-darkBlue text-3xl">{messages.length}</h1>
          <p className="text-sm text-darkBlue/65">Both read and unread</p>
        </div>
        <div className="w-full flex flex-col items-start p-3 border border-darkBlue/15 rounded hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
          <p className="text-sm text-darkBlue/65">Staff</p>
          <h1 className="text-darkBlue text-3xl">{staff.length}</h1>
          <p className="text-sm text-darkBlue/65">
            All staff at Bholy techlink
          </p>
        </div>
        <div className="w-full flex flex-col items-start p-3 border border-darkBlue/15 rounded hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
          <p className="text-sm text-darkBlue/65">Message</p>
          <h1 className="text-darkBlue text-3xl">{attendedMessageCount}</h1>
          <p className="text-sm text-darkBlue/65">Messages been attend to</p>
        </div>
        <div className="w-full flex flex-col items-start p-3 border border-darkBlue/15 rounded hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
          <p className="text-sm text-darkBlue/65">Message</p>
          <h1 className="text-darkBlue text-3xl">{yetAttendedMessageCount}</h1>
          <p className="text-sm text-darkBlue/65">
            Messages yet to be attend to
          </p>
        </div>
      </div>

      {/* table  */}

      <div className="md:w-full w-screen overflow-x-auto border border-darkBlue/5 rounded-md p-3">
        {/* hadings  */}
        <div className="md:w-full w-max flex flex-row items-center gap-2 px-3 py-1.5">
          <p className="text-sm md:w-[5%] w-12">S/N</p>
          <p className="text-sm md:w-[15%] w-40">Name</p>
          <p className="text-sm md:w-[25%] w-56">Email</p>
          <p className="text-sm md:w-[30%] w-64">Messages</p>
          <p className="text-sm md:w-[10%] w-24">Status</p>
          <p className="text-sm md:w-[15%] w-40">Action</p>
        </div>

        <div className="mt-5 h-96 overflow-y-auto  flex flex-col">
          {messages.length < 1 ? (
            <div></div>
          ) : (
            <>
              {messages.map((eachM, index) => {
                return (
                  <div
                    key={index}
                    className="md:w-full w-max flex flex-row odd:bg-darkBlue/5 items-center px-3 gap-2 py-1.5"
                  >
                    <p className="text-sm md:w-[5%] w-12">{index + 1}</p>
                    <p className="text-sm md:w-[15%] w-40">{eachM.name}</p>
                    <p className="text-sm md:w-[25%] w-56">{eachM.email}</p>
                    <p className="text-sm md:w-[30%] w-64">{eachM.message}</p>
                    <p className="text-sm md:w-[10%] w-24">Attend to</p>
                    <div className="text-sm md:w-[15%] w-40 flex flex-row gap-2.5">
                      <Link
                        href={"/admin"}
                        className="px-3 py-1 cursor-pointer rounded-md text-sm text-white bg-blue-800 flex flex-col justify-center items-center"
                      >
                        View
                      </Link>
                      <DeleteMessageModal
                        id={eachM.id}
                        message={eachM.message}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
