import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const body = req.json();
    await prisma.athlete.update({
      where: {
        id: id,
      },
      data: {},
    });
    return new NextResponse(JSON.stringify({ message: "Athlete updated" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
