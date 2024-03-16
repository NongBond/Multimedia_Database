import { prisma } from "@/util/connect";
import { NextResponse } from "next/server";

export const DELETE = async (id: string) => {
  console.log("id:", id);
  try {
    const response = await prisma.athlete.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse(JSON.stringify(response), {
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
