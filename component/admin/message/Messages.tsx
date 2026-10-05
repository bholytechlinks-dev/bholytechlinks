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
          <div className="w-full border border-darkBlue/5 rounded-md p-3">
            {/* hadings  */}

            <div className="w-full flex flex-row items-center px-3 py-1.5">
              <p className="text-sm w-[5%]">S/N</p>
              <p className="text-sm w-[15%]">Name</p>
              <p className="text-sm w-[25%]">Email</p>
              <p className="text-sm w-[25%]">Messages</p>
              <p className="text-sm w-[15%]">Status</p>
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
                        <p className="text-sm w-[25%]">{eachM.message}</p>
                        <p className="text-sm w-[15%]">
                          {eachM.attendTo ? "Attend to" : "Yet attend to"}
                        </p>
                        <div className="text-sm w-[15%] flex flex-row gap-2.5">
                          <Link
                            href={"/admin"}
                            className="px-3 py-1 cursor-pointer rounded-md text-sm text-white bg-blue-800"
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
