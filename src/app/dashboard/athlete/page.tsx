"use client";
import AddButton from "@/app/component/AddButton";
import Search from "@/app/component/Search";
import { AthleteType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const fetchAthlete = async () => {
  const res = await fetch(`http://localhost:3000/api/athlete`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  const data = await res.json();
  return data;
};

const handleDelete = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/athlete/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete athlete");
  }
  window.location.reload();
};

const setDateFormat = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getDate() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear()
  );
};

const AthletePage = ({ searchParams }: any) => {
  const [athletes, setAthletes] = useState<AthleteType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchParams?.query || "";
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAthlete();
      setAthletes(data);
    };
    fetchData();
  }, []);
  return (
    <div className="px-8 pt-4">
      <div className="flex justify-between text-black">
        <Search
          placeholder="Search athlete..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href="/dashboard/athlete/add">
          <AddButton />
        </Link>
      </div>
      <table className="table-auto w-full border-gray-600 text-center mt-2  text-black">
        <thead className=" ">
          <tr className="border-b-blacks border-b-2">
            <th className="w-32 p-3 text-sm font-semibold tracking-wide ">
              COUNTRY
            </th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
              BIB NO
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide ">
              ATHLETE
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
              GENDER
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
              DOB
            </th>
            <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
              CLASSIFICATION
            </th>
            <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {athletes
            .filter((athlete) =>
              athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((athlete) => (
              <tr key={athlete.id} className="">
                <td className="p-3 text-sm text-black">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={athlete.country.flag}
                      alt={`${athlete.country.name}'s flag`}
                      width={50}
                      height={50}
                      className="rounded-full w-20 h-20 mb-2"
                    />
                    <p>{athlete.country.name}</p>
                  </div>
                </td>
                <td className="p-3 text-base text-black">{athlete.bibNo}</td>
                <td className="p-3 text-base text-black">
                  {
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={athlete.picture}
                        alt={`${athlete.name}'s picture`}
                        width={50}
                        height={50}
                      />
                      <p>{athlete.name}</p>
                    </div>
                  }
                </td>
                <td className="p-3 text-base text-black">{athlete.gender}</td>
                <td className="p-3 text-base text-black">
                  {setDateFormat(athlete.dateOfBirth)}
                </td>
                <td className="p-3 text-base text-black">
                  {athlete.classification}
                </td>
                <td className="p-3 text-base text-black">
                  <div className="flex flex-row justify-center gap-2">
                    <Link href={`/dashboard/athlete/${athlete.id}`}>
                      <MdEdit width={50} height={50} className="w-6 h-6" />
                    </Link>
                    {/* <form action={DeleteAthlete}>
                    <input type="hidden" value={athlete.id} />
                    <button>
                      <MdDelete width={50} height={50} className="w-6 h-6" />
                    </button>
                  </form> */}
                    <button onClick={() => handleDelete(athlete.id)}>
                      <MdDelete width={50} height={50} className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthletePage;
