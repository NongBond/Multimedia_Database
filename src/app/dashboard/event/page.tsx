"use client";
import AddButton from "@/app/component/AddButton";
import Search from "@/app/component/Search";
import { EventType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const fetchEvent = async () => {
  const res = await fetch(`http://localhost:3000/api/event`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  const data = await res.json();
  return data;
};

const handleDelete = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/event/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete event");
  }
  window.location.reload();
};

const separateDateAndTime = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();
    return `${formattedDate}`;
  };

const EventPage = ({ searchParams }: any) => {
  const [event, setEvent] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchParams?.query || "";
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvent();
      setEvent(data);
    };
    fetchData();
  }, []);
  return (
    <div className="px-8 pt-4">
      <div className="flex justify-between text-black">
        <Search
          placeholder="Search event..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href="/dashboard/event/add">
          <AddButton />
        </Link>
      </div>
      <table className="table-auto w-full border-gray-600 text-center mt-2  text-black">
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
            <th className="w-10 p-3 text-sm font-semibold tracking-wide border">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {event
            .filter((event) =>
              event.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((event) => (
              <tr key={event.id} className="">
                <td className="p-3 border">{event.eventNumber}</td>
                <td className="p-1 border border-gray-400">{event.time}<br />{separateDateAndTime(event.date)}</td>
                <td className="p-3 border border-gray-400">{event.name}</td>
                <td className="p-3 border border-gray-400">{event.gender}</td>
                <td className="p-3 border border-gray-400">{event.classification}</td>
                <td className="p-3 border border-gray-400">{event.stage}</td>
                <td className="p-3 border border-gray-400">{event.status}</td>
                
                <td className="text-center border border-gray-400">
                    <div className="flex flex-row justify-center gap-2">
                      <Link href={`/dashboard/athlete/${event.id}`}>
                        <MdEdit width={50} height={50} className="w-6 h-6 cursor-pointer" />
                      </Link>
                      <MdDelete width={50} height={50} className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(event.id)}/>
                    </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventPage;
