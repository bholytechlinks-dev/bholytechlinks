import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

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
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
  ) as jwt.JwtPayload;

  if (!decoded) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const id = decoded.id;
  if (!id) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const user = await prisma.admin.findUnique({
    where: {
      id: id,
      role: "Admin",
    },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  console.log(token);
};

export const AuthourizationCheck = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("bholy")?.value;
  if (!token) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
  ) as jwt.JwtPayload;

  if (!decoded) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const id = decoded.id;
  if (!id) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  const user = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  if (user.role !== "Admin" && user.role !== "Staff") {
    return NextResponse.json({
      success: false,
      message: "unauthorise access",
    });
  }
  console.log(token);
};
