import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        medals: true,
      },
    });

    const formattedCountries = countries.map((country) => ({
      name: country.name,
      medals: {
        gold: country.medals.filter((medal) => medal.type === "GOLD").length,
        silver: country.medals.filter((medal) => medal.type === "SILVER")
          .length,
        bronze: country.medals.filter((medal) => medal.type === "BRONZE")
          .length,
      },
    }));

    return new NextResponse(JSON.stringify(formattedCountries), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
