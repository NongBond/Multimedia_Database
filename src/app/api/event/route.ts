import { prisma } from "@/util/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const athletes = await prisma.event.findMany({
          orderBy: {
            createdAt: "desc",
          },
          include: {
            athletes: true,
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
