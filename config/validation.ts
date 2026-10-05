import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
export const mesageValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "phone must be at least 8 characters").optional(),
  message: z.string().min(10, "message must be at least 10 characters"),
  subject: z.string().min(4, "subject must be at least 4 characters"),
});

export const signValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "password must be at least 4 characters"),
});

export const isAdminCheck = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("bholy")?.value;

  if (!token) {
    return null;
  }

  const { payload } = await jose.jwtVerify(token, SECRET);

  if (!payload) {
    return null;
  }
  const id = payload.id as string;
  if (!id) {
    return null;
  }
  const user = await prisma.admin.findUnique({
    where: {
      id: id,
      role: "Admin",
    },
  });
  if (!user) {
    return null;
  }
  return user;
};

export async function AuthourizationCheck() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bholy")?.value;
  if (!token) {
    return null;
  }
  const { payload } = await jose.jwtVerify(token, SECRET);
  if (!payload) {
    return null;
  }
  const id = payload.id as string;
  if (!id) {
    return null;
  }
  const user = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  }
  if (user.role !== "Admin" && user.role !== "Staff") {
    return null;
  }
  return user;
}

export async function AuthourizationAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bholy")?.value;
  if (!token) {
    return null;
  }
  const { payload } = await jose.jwtVerify(token, SECRET);

  if (!payload) {
    return null;
  }
  const id = payload.id as string;
  if (!id) {
    return null;
  }
  const user = await prisma.admin.findUnique({
    where: {
      id: id,
      role: "Admin",
    },
  });

  if (!user) {
    return null;
  }
  return user;
}
