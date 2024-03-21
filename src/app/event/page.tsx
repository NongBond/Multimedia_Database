"use client";
import { EventType } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EventPage = () => {
  const [event, setEvent] = useState<EventType[]>([]);
  const [eventelected, setEventelected] = useState("all");
  const [daySelected, setDaySelected] = useState("all");
  const [timeSelected, setTimeSelected] = useState("all");
  const [typeSelected, setTypeSelected] = useState("all");
  const [uniqueDays, setUniqueDays] = useState<string[]>([]);
  const [uniqueGenders, setUniqueGenders] = useState<string[]>([]);
  const [uniqueTimes, setUniqueTimes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEvent();
        setEvent(data);
        const uniqueDays: string[] = Array.from(
          new Set(data.map((event: EventType) => event.date.split("T")[0]))
        );
        setUniqueDays(uniqueDays);
        const uniqueGenders: string[] = Array.from(
          new Set(data.map((event: EventType) => event.gender))
        );
        setUniqueGenders(uniqueGenders);
        const uniqueTimes: string[] = Array.from(
          new Set(data.map((event: EventType) => event.time))
        );
        setUniqueTimes(uniqueTimes);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };
    fetchData();
  }, []);

  const fetchEvent = async () => {
    const res = await fetch(`http://localhost:3000/api/event`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch event");
    }
    return res.json();
  };

  const filterevent: EventType[] =
    eventelected === "all"
      ? event
      : event.filter((event) => event.name === eventelected);

  const filteredByDay =
    daySelected === "all"
      ? filterevent
      : filterevent.filter((event) => event.date.includes(daySelected));

  const filteredByTypeAndTime =
    timeSelected === "all"
      ? filteredByDay
      : filteredByDay.filter((event) => {
          const eventTime = parseInt(event.time.split(":")[0]); // Extracting hours from the time
          if (timeSelected === "afternoon") {
            return eventTime >= 12; // Events starting from 12 PM onwards
          } else if (timeSelected === "morning") {
            return eventTime < 12; // Events starting before 12 PM
          }
          return true;
        });

  const filteredByType =
    typeSelected === "all"
      ? filteredByTypeAndTime
      : filteredByTypeAndTime.filter((event) => {
          if (typeSelected === "men") {
            return event.gender === "men";
          } else if (typeSelected === "female") {
            return event.gender === "female";
          }
          return true;
        });

  const separateDateAndTime = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();
    return `${formattedDate}`;
  };

  const filteredEvents = filteredByType.filter(
    (event) =>
      event.eventNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-28">
      <div className="mt-5 text-white">
        <label htmlFor="type-filter" className="ml-3">
          Event:
        </label>
        <select
          id="type-filter"
          onChange={(e) => setTypeSelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
          {uniqueGenders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <label htmlFor="day-filter" className="ml-3">
          Day:
        </label>
        <select
          id="day-filter"
          onChange={(e) => setDaySelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <label htmlFor="time-filter" className="ml-3">
          Time:
        </label>
        <select
          id="time-filter"
          onChange={(e) => setTimeSelected(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
        </select>
        <input
          type="text"
          placeholder="Search by No or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-3 p-2 rounded-md bg-gray-100 text-gray-700"
        />
      </div>
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide border">
              No
            </th>
            <th className="w-25 p-3 text-sm font-semibold tracking-wide border">
              Date & Time
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              Name
            </th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide border">
              Gender
            </th>
            <th className="w-40 p-3 text-sm font-semibold tracking-wide border">
              Classification
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              Stage
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide border">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td className="p-3 border border-gray-400">
                {event.eventNumber}
              </td>
              <td className="p-1 border border-gray-400">
                {event.time}
                <br />
                {separateDateAndTime(event.date)}
              </td>
              <td className="p-3 border border-gray-400">{event.name}</td>
              <td className="p-3 border border-gray-400">{event.gender}</td>
              <td className="p-3 border border-gray-400">
                {event.classification}
              </td>
              <td className="p-3 border border-gray-400">{event.stage}</td>
              <td className="p-3 border border-gray-400">{event.status}</td>
              <td className="p-3 border border-gray-400">
                <Link href={`event/${event.id}`}>GO</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventPage;
