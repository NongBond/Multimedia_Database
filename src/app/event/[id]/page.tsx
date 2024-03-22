"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AthleteType, EventType, MedalTypeEnum } from "@/types/types";

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<EventType | null>(null);
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetchEvent(id as string).then(setEvent);
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }
  if (event.status === "live") {
    return <div className="px-28 mt-4">
      <Link href="/event" className="bg-yellow-400 px-2 py-3 rounded-lg text-white w-20 text-center">
        Back
      </Link>
      <h1 className="text-3xl font-semibold text-center text-white mt-4">Not resulted yet</h1></div>;
  }
  
  if (event.status === "start-list") {
    return <div className="px-28 mt-4">
      <Link href="/event" className="bg-yellow-400 px-2 py-3 rounded-lg text-white w-20 text-center">
        Back
      </Link>

    <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
      <thead className="bg-gray-50 border-b-2 border-gray-500">
        <tr>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
            COUNTRY
          </th>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
            BIB NO
          </th>
          <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
            ATHLETE
          </th>
          <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
            GENDER
          </th>
          <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
            CLASSIFICATION
          </th>
        </tr>
      </thead>
      <tbody>
      {event.athletes &&
        event.athletes.map((athlete) => (
          <tr key={athlete.id}>
            <td>{event.name}</td>
            <td>{athlete.bibNo}</td>
            <td className="flex flex-row items-center justify-center gap-6">
                <Image
                    src={athlete.picture}
                    alt={athlete.name}
                    width={50}
                    height={50}
                />
                {athlete.name}
            </td>
            <td>{athlete.gender}</td>
            <td>{athlete.classification}</td>
          </tr>
        ))}
      </tbody>
      </table>
  </div>;
  }

  return (
    <div className="px-28 mt-4">
      <Link href="/event" className="bg-yellow-400 px-2 py-3 rounded-lg text-white w-20 text-center">
        Back
      </Link>
      <h1 className="text-3xl font-semibold text-center text-white mt-4">Result</h1>
      <table className="table-auto w-4/5 border-2 border-gray-600 text-center mt-4 bg-slate-200 mx-auto">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide">Event</th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide">Athlete</th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide">Medals</th>
          </tr>
        </thead>
        <tbody>
          {event.athletes.map((athlete: AthleteType) => (
            <tr key={athlete.id}>
              <td>{event.name}</td>
              <td className="flex flex-row items-center justify-center gap-6 py-3"><Image
                    src={athlete.picture}
                    alt={athlete.name}
                    width={50}
                    height={50}
                />
                {athlete.name}</td>
              <td>
                {athlete.medal.map((medal, index) => (
                  <div key={index}>
                    {medal.type === MedalTypeEnum.GOLD && "Gold"}
                    {medal.type === MedalTypeEnum.SILVER && "Silver"}
                    {medal.type === MedalTypeEnum.BRONZE && "Bronze"}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const fetchEvent = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/event/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
}