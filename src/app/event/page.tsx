"use client";
import { EventType } from "@/types/types";
import React, { useEffect, useState } from "react";

const fetchData = async () => {
  const res = await fetch(`http://localhost:3000/api/event`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  const data = await res.json();
  return data;
};

const EventPage = () => {
  const [event, setEvent] = useState<EventType[]>([]);
  const [eventelected, setEventelected] = useState("all");
  const [daySelected, setDaySelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [typeSelected, setTypeSelected] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvent();
      setEvent(data);
    };
    fetchData();
  }, []);

  const fetchEvent = async () => {
    const res = await fetch(`http://localhost:3000/api/event`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch athlete");
    }
    const data = await res.json();
    return data;
  };

  const filterevent: EventType[] =
    eventelected === "all"
      ? event
      : event.filter((event) => event.gender === eventelected);

  return (
    <div className="px-28">
      <div className="mt-5 text-white">
        <label htmlFor="event-filter" className="ml-3">
          event:
        </label>
        <select
          id="event-filter"
          onChange={(e) => setEventelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
        </select>
        <label htmlFor="day-filter" className="ml-3">
          DAY:
        </label>
        <select
          id="day-filter"
          onChange={(e) => setDaySelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
        </select>
        <label htmlFor="time-filter" className="ml-3">
          TIME:
        </label>
        <select
          id="time-filter"
          onChange={(e) => setTimeSelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
        </select>
        <label htmlFor="type-filter" className="ml-3">
          TYPE:
        </label>
        <select
          id="type-filter"
          onChange={(e) => setTypeSelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
        </select>
      </div>
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-25 p-3 text-sm font-semibold tracking-wide border">
              DATE&TIME:
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide border">
              NO:
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              NAME:
            </th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide border">
              GENDER:
            </th>
            <th className="w-40p-3 text-sm font-semibold tracking-wide border">
              CLASSIFICATION:
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              Stage:
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              Status:
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {filterevent.map((event) => (
            <tr key={event.id}>
              <td className="p-3 border">{event.date}</td>
              <td className="p-3 border">{event.no}</td>
              <td className="p-3 border">{event.name}</td>
              <td className="p-3 border"></td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default EventPage;
