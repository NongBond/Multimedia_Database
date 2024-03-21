import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const medal = await prisma.medal.findUnique({
      where: {
        id: id,
      },
      include: {
        country: true,
        athlete: true,
        event: true,
      },
    });
    return new NextResponse(JSON.stringify(medal), {
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
