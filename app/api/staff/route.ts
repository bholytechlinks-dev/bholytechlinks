import { AuthourizationCheck, isAdminCheck } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authourise = await AuthourizationCheck();
    if (!authourise) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }

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

export async function DELETE(req: Request) {
  try {
    const admin = await isAdminCheck();
    const { id } = await req.json();

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }
    
    const staff = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    if (!staff) {
      return NextResponse.json({
        success: false,
        message: "staff not found",
      });
    }
    await prisma.admin.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
