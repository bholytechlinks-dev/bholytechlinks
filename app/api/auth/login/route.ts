import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { signinFields } from "@/type";
import { signValidation } from "@/config/validation";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const { email, password } = await req.json();

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

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
    const others = await prisma.admin.findUnique({
      where: {
        email,
      },
      omit: {
        password: true,
      },
    });
    if (!others) {
      return NextResponse.json({
        success: false,
        message: "user not found",
      });
    }

    const token = jwt.sign(
      { id: others.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "7D",
      },
    );

    cookieStore.set("bholy", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return NextResponse.json({
      success: true,
      message: "Login successfully",
      data: others,
      token,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
