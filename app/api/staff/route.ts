import { AuthourizationCheck } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await AuthourizationCheck();

    const Staff = await prisma.admin.findMany();

    return NextResponse.json({
      success: true,
      message: "All message gotten",
      data: Staff,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
