import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string; athleteId: string } }
) => {
  const { id, athleteId } = params;
  console.log(id, athleteId);
  try {
    await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        athletes: {
          connect: {
            id: athleteId,
          },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Athlete added to event" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
