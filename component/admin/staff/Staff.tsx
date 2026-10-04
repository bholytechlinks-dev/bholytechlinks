"use client";

import DeleteStaffModal from "@/component/heroui/DeleteStaffModal";
import EditRoleModal from "@/component/heroui/EditRoleModal";
import FadeLoading from "@/component/loading/FadeLoading";
import { Staff } from "@/type";

const Staffs = ({ staff }: { staff: Staff }) => {
  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-3xl text-darkBlue font-bold">Message</h1>
        <p className="text-sm text-darkBlue/65">
          List of all Messages for bholy techlink
        </p>
      </div>

      {/* table  */}
      {!staff ? (
        <div className="w-full">
          <FadeLoading />
        </div>
      ) : (
        <>
          <div className="w-full border border-darkBlue/5 rounded-md p-3">
            {/* hadings  */}

            <div className="w-full flex flex-row items-center px-3 py-1.5">
              <p className="text-sm w-[5%]">S/N</p>
              <p className="text-sm w-[40%]">Email</p>
              <p className="text-sm w-[15%]">Role</p>
              <p className="text-sm w-[40%]">Action</p>
            </div>

            <div className="mt-5 w-full h-96 overflow-y-auto  flex flex-col">
              {staff.length < 1 ? (
                <div></div>
              ) : (
                <>
                  {staff.map((eachS, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-row odd:bg-darkBlue/5 items-center px-3 py-1.5"
                      >
                        <p className="text-sm w-[5%]">{index + 1}</p>
                        <p className="text-sm w-[40%]">{eachS.email}</p>
                        <p className="text-sm w-[15%]">{eachS.role}</p>
                        <div className="text-sm w-[15%] flex flex-row gap-2.5">
                          <EditRoleModal id={eachS.id} email={eachS.email} />
                          <DeleteStaffModal id={eachS.id} email={eachS.email} />
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

export default Staffs;
