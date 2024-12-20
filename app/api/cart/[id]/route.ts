import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const token = req.cookies.get("cartToken")?.value;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "CART" }, { status: 500 });
  }
}
