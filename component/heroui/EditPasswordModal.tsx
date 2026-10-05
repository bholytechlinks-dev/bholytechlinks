"use client";

import { Button, Modal } from "@heroui/react";
import React, { useState } from "react";
import AddToast from "./AddToast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditPasswordModal = ({ id, email }: { id: string; email: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEditPassword = async () => {
    try {
      setLoading(true);
      const request = await fetch(`/api/staff`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newPassword: password }),
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
        Edit Password
      </Button>

      <Modal.Backdrop isOpen={isOpen} className="w-full">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
            <Modal.Header>
              <Modal.Heading>Confirm Edit Password</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to edit {email} password? This action
                cannot be undone.
              </p>

              <div className="relative w-full mt-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-12 rounded-md border-none bg-darkBlue/5 pl-5 pr-12"
                  required
                  name="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <div className="w-max h-max p-1.5 rounded-md absolute top-2.5 right-3">
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(false)}
                      className="text-darkBlue text-lg cursor-pointer"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShowPassword(true)}
                      className="text-darkBlue text-lg cursor-pointer"
                    />
                  )}
                </div>
              </div>
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
                  onClick={() => handleEditPassword()}
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

export default EditPasswordModal;
