"use client";

import { Button, Modal } from "@heroui/react";
import React, { useState } from "react";
import AddToast from "./AddToast";
import { useRouter } from "next/navigation";
import { Role } from "@/type";

const EditRoleModal = ({
  id,
  email,
  role,
}: {
  id: string;
  email: string;
  role: Role;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState<Role | null>(null);

  const roles = ["User", "Staff", "Admin"];

  const handleEditRole = async () => {
    try {
      setLoading(true);
      const request = await fetch(`/api/staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role: newRole }),
      });
      const response = await request.json();
      if (response.success) {
        AddToast(response.message as string, "success");
        return router.refresh();
      } else {
        return AddToast(response.message as string, "danger");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal>
      <Button
        onClick={() => setIsOpen(true)}
        className=" text-white px-3 py-1 cursor-pointer rounded-md text-sm"
        size="sm"
        variant="primary"
      >
        Edit Role
      </Button>

      <Modal.Backdrop isOpen={isOpen} className="w-full">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
            <Modal.Header>
              <Modal.Heading>Confirm Edit Role</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete this {email} {role} role? This
                action cannot be undone.
              </p>

              <select
                onChange={(
                  e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
                ) => setNewRole(e.target.value as Role)}
                name=""
                id=""
                className="w-full h-10 border border-gray-300 rounded-md my-5"
              >
                {roles.map((eachR, index) => {
                  return (
                    <option key={index} value={eachR as Role}>
                      {eachR}
                    </option>
                  );
                })}
              </select>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setIsOpen(false)} className="w-full">
                Cancel
              </Button>
              {loading ? (
                <Button
                  type="button"
                  className="w-full bg-red-800 text-white cursor-not-allowed"
                  isDisabled={true}
                >
                  Editing
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditRole()}
                  className="w-full bg-red-800 text-white"
                >
                  Edit
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditRoleModal;
