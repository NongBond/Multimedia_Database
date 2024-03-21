"use client";
import React, { useEffect, useState } from "react";
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
  if (event.status !== "result") {
    return <div>Not resulted yet</div>;
  }

  return (
    <div>
      <h1>Results</h1>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Athlete</th>
            <th>Medals</th>
          </tr>
        </thead>
        <tbody>
          {event.athletes.map((athlete: AthleteType) => (
            <tr key={athlete.id}>
              <td>{event.name}</td>
              <td>{athlete.name}</td>
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