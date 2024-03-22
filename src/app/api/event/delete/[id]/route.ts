import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  console.log(id);
  try {
    await prisma.event.delete({ where: { id: id } });
    return new NextResponse(JSON.stringify("delete"), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
