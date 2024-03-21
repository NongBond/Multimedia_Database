import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; athleteId: string } }
) => {
  const { id, athleteId } = params;
  console.log(id, athleteId);
  console.log("delete");
  try {
    await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        athletes: {
          disconnect: {
            id: athleteId,
          },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Athlete removed from event" }),
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
