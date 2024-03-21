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

const fetchAthlete = async () => {
  const res = await fetch(`http://localhost:3000/api/athlete`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  return res.json();
};

const SingleEventPage = async ({ params }: { params: { id: string } }) => {
  const event: EventType = await fetchEvent(params.id);
  const athletes = await fetchAthlete();
  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-auto pt-10 w-4/5">
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide">
              event
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide">
              GOLD
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide">
              SILVER
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide">
              BRONZE
            </th>
          </tr>
        </thead>
        <tbody>
              <tr key={event.id} className="border-b-2 border-gray-500 ">
                <td className="p-3 text-base text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <span>{event.name}</span>
                  </div>
                </td>
                <td className="p-3 text-base text-gray-700">{}</td>
                <td className="p-3 text-base text-gray-700">{}</td>
                <td className="p-3 text-base text-gray-700">{}</td>
              </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleEventPage;
