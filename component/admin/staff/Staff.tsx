"use client";

import DeleteStaffModal from "@/component/heroui/DeleteStaffModal";
import EditPasswordModal from "@/component/heroui/EditPasswordModal";
import EditRoleModal from "@/component/heroui/EditRoleModal";
import FadeLoading from "@/component/loading/FadeLoading";
import { Staff } from "@/type";

const Staffs = ({ staff }: { staff: Staff }) => {
  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-3xl text-darkBlue font-bold">Staff</h1>
        <p className="text-sm text-darkBlue/65">
          List of all Staff for bholy techlink
        </p>
      </div>

      {/* table  */}
      {!staff ? (
        <div className="w-full">
          <FadeLoading />
        </div>
      ) : (
        <>
          <div className="md:w-full w-screen overflow-x-auto border border-darkBlue/5 rounded-md p-3">
            {/* hadings  */}

            <div className="md:w-full w-max flex flex-row items-center gap-2 px-3 py-1.5">
              <p className="text-sm md:w-[5%] w-12">S/N</p>
              <p className="text-sm md:w-[40%] w-72">Email</p>
              <p className="text-sm md:w-[15%] w-40">Role</p>
              <p className="text-sm md:w-[40%] w-72">Action</p>
            </div>

            <div className="md:w-full w-max mt-5 h-96 overflow-y-auto  flex flex-col">
              {staff.length < 1 ? (
                <div></div>
              ) : (
                <>
                  {staff.map((eachS, index) => {
                    return (
                      <div
                        key={index}
                        className="md:w-full w-max flex flex-row odd:bg-darkBlue/5 items-center px-3 gap-2 py-1.5"
                      >
                        <p className="text-sm md:w-[5%] w-12">{index + 1}</p>
                        <p className="text-sm md:w-[40%] w-72">{eachS.email}</p>
                        <p className="text-sm md:w-[15%] w-40">{eachS.role}</p>
                        <div className="text-sm md:w-[40%] w-72 flex flex-row gap-2.5">
                          <EditRoleModal
                            id={eachS.id}
                            email={eachS.email}
                            role={eachS.role}
                          />
                          <EditPasswordModal
                            id={eachS.id}
                            email={eachS.email}
                          />
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
