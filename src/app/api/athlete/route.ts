import { prisma } from "@/util/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const athletes = await prisma.athlete.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        country: true,
      },
    });
    return new NextResponse(JSON.stringify(athletes), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

// export const GET = async (query: any) => {
//   const { search } = query;
//   console.log(search);
//   try {
//     const athletes = await prisma.athlete.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         country: true,
//       },
//     });
//     return new NextResponse(JSON.stringify(athletes), { status: 200 });
//   } catch (err) {
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong" }),
//       { status: 500 }
//     );
//   }
// };
