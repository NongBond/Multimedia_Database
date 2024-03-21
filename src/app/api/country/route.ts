import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        medals: true,
      },
      where: {
        ...(country && { name: country }),
      },
    });
    return new NextResponse(JSON.stringify(countries), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
