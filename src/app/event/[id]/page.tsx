import { EventType } from "@/types/types";
import Link from "next/link";
import React from "react";

const fetchEvent = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/event/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
};

const SingleEventPage = async ({ params }: { params: { id: string } }) => {
  const event: EventType = await fetchEvent(params.id);

  return (
    <div>
      <Link href="/event" className="bg-orange-300 px-4 py-2 rounded-lg">
        Back
      </Link>
      <div className="flex flex-row gap-8 items-center justify-center">
        <div className="flex flex-col gap-4 text-white">
          <div>
            <p className="font-medium text-lg mb-2">Name:</p>
            <p className="pl-4">{event.name}</p>
          </div>
          <div className="flex flex-row gap-1 text-white items-center ">
            <p className="font-medium text-lg">Age:</p>{" "}
          </div>
          <div className="flex flex-row gap-1 text-white items-center ">
            <p className="font-medium text-lg">Gender:</p> <p>{event.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
