import { prisma } from "@/util/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const createInput: Prisma.CountryCreateInput = {
      name: body.name,
      abbreviation: body.abbreviation,
      flag: body.flag,
    };

    await prisma.country.create({
      data: createInput,
    });

    return new NextResponse(
      JSON.stringify({ message: "Country created successfully" }),
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
