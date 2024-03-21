import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const body = await req.json();
    const event = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        eventNumber: body.eventNumber,
        name: body.name,
        classification: body.classification,
        gender: body.gender,
        date: body.date,
        time: body.time,
        stage: body.stage,
        status: body.status,
      },
    });
    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
