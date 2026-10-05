"use client";

import DeleteModal from "@/component/heroui/DeleteMessageModal";
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

      <div className="w-full border border-darkBlue/5 rounded-md p-3">
        {/* hadings  */}

        <div className="w-full flex flex-row items-center px-3 py-1.5">
          <p className="text-sm w-[5%]">S/N</p>
          <p className="text-sm w-[15%]">Name</p>
          <p className="text-sm w-[25%]">Email</p>
          <p className="text-sm w-[30%]">Messages</p>
          <p className="text-sm w-[10%]">Status</p>
          <p className="text-sm w-[15%]">Action</p>
        </div>

        <div className="mt-5 w-full h-96 overflow-y-auto  flex flex-col">
          {messages.length < 1 ? (
            <div></div>
          ) : (
            <>
              {messages.map((eachM, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-row odd:bg-darkBlue/5 items-center px-3 py-1.5"
                  >
                    <p className="text-sm w-[5%]">{index + 1}</p>
                    <p className="text-sm w-[15%]">{eachM.name}</p>
                    <p className="text-sm w-[25%]">{eachM.email}</p>
                    <p className="text-sm w-[30%]">{eachM.message}</p>
                    <p className="text-sm w-[10%]">Attend to</p>
                    <div className="text-sm w-[15%] flex flex-row gap-2.5">
                      <Link
                        href={"/admin"}
                        className="px-3 py-1 cursor-pointer rounded-md text-sm text-white bg-blue-800"
                      >
                        View
                      </Link>
                      <DeleteModal id={eachM.id} message={eachM.message} />
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
