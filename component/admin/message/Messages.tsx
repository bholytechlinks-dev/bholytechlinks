"use client";

import DeleteMessageModal from "@/component/heroui/DeleteMessageModal";
import FadeLoading from "@/component/loading/FadeLoading";
import { Messages } from "@/type";
import Link from "next/link";

const Message = ({ messages }: { messages: Messages }) => {
  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-3xl text-darkBlue font-bold">Message</h1>
        <p className="text-sm text-darkBlue/65">
          List of all Messages for bholy techlink
        </p>
      </div>

      {/* table  */}

      {!messages ? (
        <div className="w-full">
          <FadeLoading />
        </div>
      ) : (
        <>
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

            <div className="md:w-full w-max mt-5 h-96 overflow-y-auto  flex flex-col">
              {messages.length < 1 ? (
                <div></div>
              ) : (
                <>
                  {messages.map((eachM, index) => {
                    return (
                      <div
                        key={index}
                        className="md:w-full flex flex-row odd:bg-darkBlue/5 items-center px-3 gap-2 py-1.5"
                      >
                        <p className="text-sm md:w-[5%] w-12">{index + 1}</p>
                        <p className="text-sm md:w-[15%] w-40">{eachM.name}</p>
                        <p className="text-sm md:w-[25%] w-56">{eachM.email}</p>
                        <p className="text-sm md:w-[30%] w-64">
                          {eachM.message}
                        </p>
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
        </>
      )}
    </div>
  );
};

export default Message;
