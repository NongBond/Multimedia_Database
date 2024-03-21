import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const medals = await prisma.medal.findMany({
      include: {
        athlete: true,
        event: true,
        country: true,
      },
    });
    return new NextResponse(JSON.stringify(medals), {
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