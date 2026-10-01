"use client";

import { responseStatus } from "@/type";
import { toast } from "@heroui/react";

const AddToast = (response: string, status: responseStatus) => {
  toast[status](response);
};

export default AddToast;
