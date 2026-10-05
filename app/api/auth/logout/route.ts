import { AuthourizationCheck } from "@/config/validation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const authourise = await AuthourizationCheck();
    if (!authourise) {
      return NextResponse.json({
        success: false,
        message: "unauthorise access",
      });
    }

    const cookieStore = await cookies();
    cookieStore.delete("bholy");

    return NextResponse.json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
