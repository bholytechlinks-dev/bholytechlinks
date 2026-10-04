import { AuthourizationCheck, mesageValidation } from "@/config/validation";
import { prisma } from "@/lib/prisma";
import { messageFields } from "@/type";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, name, subject, phone, email } = await req.json();
    if (!message || !name || !subject || !phone || !email) {
      return NextResponse.json({
        success: false,
        message: "All field are required",
      });
    }
    const result = mesageValidation.safeParse({
      message,
      name,
      subject,
      phone,
      email,
    });

    if (!result.success) {
      const path = result.error.issues[0].path[0] as messageFields;
      const errMessage = result.error.flatten().fieldErrors[path] as string[];
      return NextResponse.json({
        success: false,
        message: errMessage[0],
      });
    }

    await prisma.message.create({
      data: {
        email,
        message,
        name,
        phone,
        subject,
      },
    });

    return NextResponse.json({
      success: true,
      message: "message delivered successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: true,
      message: "Internal server error",
    });
  }
}

export async function GET() {
  try {
    const authourise = await AuthourizationCheck();
    // console.log(authourise, "doneeee");

    if (!authourise) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }

    const messages = await prisma.message.findMany();

    return NextResponse.json({
      success: true,
      message: "All message gotten",
      data: messages,
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
    const authourise = await AuthourizationCheck();
    if (!authourise) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }
    const { id } = await req.json();
    await prisma.message.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/message");
    revalidatePath("/admin", "layout");
    return NextResponse.json({
      success: true,
      message: "message deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
