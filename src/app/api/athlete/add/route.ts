import { prisma } from "@/util/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const createInput: Prisma.AthleteCreateInput = {
      name: body.name,
      bibNo: body.bibNo,
      classification: body.classification,
      gender: body.gender,
      country: { connect: { id: body.countryId } },
      dateOfBirth: body.dateOfBirth,
      picture: body.picture,
    };

    await prisma.athlete.create({
      data: createInput,
    });

    return new NextResponse(
      JSON.stringify({ message: "Athlete created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
