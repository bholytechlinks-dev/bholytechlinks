"use client";

import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import AddToast from "./AddToast";
import { useRouter } from "next/navigation";

const DeleteMessageModal = ({
  id,
  message,
}: {
  id: string;
  message: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteMessage = async () => {
    try {
      setLoading(true);
      const request = await fetch(`/api/message`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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
        className="bg-red-800 text-white px-3 py-1 cursor-pointer rounded-md text-sm"
        size="sm"
      >
        Delete
      </Button>

      <Modal.Backdrop isOpen={isOpen} className="w-full">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
            <Modal.Header>
              <Modal.Heading>Delete confirmation</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-1">
              <p>Are you sure you want to delete this message?</p>
              <p className="text-black font-400">{message}</p>
              <p>This action cannot be undone.</p>
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
                  Deleting...
                </Button>
              ) : (
                <Button
                  onClick={() => handleDeleteMessage()}
                  className="w-full bg-red-800 text-white"
                >
                  Delete
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteMessageModal;
