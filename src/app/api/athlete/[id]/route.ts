import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

// export const PUT = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   try {
//     const body = req.json();
//     await prisma.athlete.update({
//       where: {
//         id: id,
//       },
//       data: {},
//     });
//     return new NextResponse(JSON.stringify({ message: "Athlete updated" }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong" }),
//       { status: 500 }
//     );
//   }
// };

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const athlete = await prisma.athlete.findUnique({
      where: {
        id: id,
      },
      include: {
        country: true,
        medal: true,
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
