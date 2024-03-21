import { prisma } from "@/util/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const createInput: Prisma.EventCreateInput = {
            eventNumber: body.eventNumber,
            name: "",
            classification: "",
            gender: "",
            date: "",
            time: "",
            stage: "",
            status: "",
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


