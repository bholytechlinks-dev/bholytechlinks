import { AuthourizationAdmin, AuthourizationCheck } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { Role } from "@/type";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
    const admin = await AuthourizationAdmin();

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }
    const { id } = await req.json();

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
    if (staff.role === "Admin") {
      return NextResponse.json({
        success: false,
        message: "Admin cant be deleted",
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

// editting role
export async function PUT(req: Request) {
  try {
    const admin = await AuthourizationAdmin();
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json({
        success: false,
        message: "All field are required",
      });
    }

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }

    const user = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }
    if (user.role === "Admin") {
      return NextResponse.json({
        success: false,
        message: "Admin role cant be updated",
      });
    }
    await prisma.admin.update({
      where: {
        id,
      },
      data: {
        role: role as Role,
      },
    });
    revalidatePath("/");
    return NextResponse.json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}

// edditing password
export async function PATCH(req: Request) {
  try {
    const { id, newPassword } = await req.json();
    if (!id || !newPassword) {
      return NextResponse.json({
        success: false,
        message: "All field are required",
      });
    }

    const admin = await AuthourizationAdmin();

    if (!admin) {
      return NextResponse.json({
        success: true,
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
        message: "user not found",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
