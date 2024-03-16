import { prisma } from "@/util/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const body = await req.json();
    const athlete = await prisma.athlete.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        bibNo: body.bibNo,
        classification: body.classification,
        gender: body.gender,
        country: { connect: { id: body.countryId } },
        dateOfBirth: body.dateOfBirth,
        picture: body.picture,
      },
    });
    return new NextResponse(JSON.stringify(athlete), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
