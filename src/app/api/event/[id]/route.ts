import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const athlete = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        athletes: {
          include: {
            country: true,
            medal: true,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(athlete), {
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

// export const DELETE = async (
//   req: NextRequest,
//   { params }: { params: { eventId: string; athleteId: string } }
// ) => {
//   const { eventId, athleteId } = params;
//   console.log(eventId, athleteId);
//   try {
//     await prisma.event.update({
//       where: {
//         id: eventId,
//       },
//       data: {
//         athletes: {
//           disconnect: {
//             id: athleteId,
//           },
//         },
//       },
//     });
//     return new NextResponse(
//       JSON.stringify({ message: "Athlete removed from event" }),
//       {
//         status: 200,
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong" }),
//       { status: 500 }
//     );
//   }
// };
