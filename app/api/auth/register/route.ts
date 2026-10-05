import { signValidation } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { signinFields } from "@/type";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, code } = await req.json();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "All field are required",
      });
    }

    const AccessCode = process.env.ACCESS_CODE as string;
    if (code !== AccessCode) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }

    const result = signValidation.safeParse({ email, password });

    if (!result.success) {
      const path = result.error.issues[0].path[0] as signinFields;
      const errMessage = result.error.flatten().fieldErrors[path] as string[];
      return NextResponse.json({
        success: false,
        message: errMessage[0],
      });
    }

    const user = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Registration successfull",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}




