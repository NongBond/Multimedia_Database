import { prisma } from "@/util/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const createInput: Prisma.EventCreateInput = {
            name: body.name,
            eventNumber: body.eventNumber,
            classification: body.classification,
            gender: body.gender,
            athletes: { connect: { id: body.athleteId } },
            date: body.date,
            time: body.time,
            stage: body.stage,
        };

        await prisma.event.create({
            data: createInput,
        });

        return new NextResponse(
            JSON.stringify({ message: "Event created successfully" }),
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


