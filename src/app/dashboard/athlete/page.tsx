import AddButton from "@/app/component/AddButton";
import EditButton from "@/app/component/EditButton";
import Search from "@/app/component/Search";
import { AthleteType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const setDateFormat = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getDate() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear()
  );
};

const AthletePage = async () => {
  const athletes: AthleteType[] = await fetchAthlete();
  return (
    <div className="px-8 bg-slate-600 pt-4">
      <div className="flex justify-between">
        <Search placeholder="Search athlete..." />
        <Link href="/dashboard/athlete/add">
          <AddButton />
        </Link>
      </div>
      <table className="table-auto w-full text-center mt-2 text-white">
        <thead className=" ">
          <tr>
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
          {athletes.map((athlete) => (
            <tr key={athlete.id} className="">
              <td className="p-3 text-sm text-white">
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
              <td className="p-3 text-base text-white">{athlete.bibNo}</td>
              <td className="p-3 text-base text-white">
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
              <td className="p-3 text-base text-white">{athlete.gender}</td>
              <td className="p-3 text-base text-white">
                {setDateFormat(athlete.dateOfBirth)}
              </td>
              <td className="p-3 text-base text-white">
                {athlete.classification}
              </td>
              <td className="p-3 text-base text-white">
                <div>
                  <Link href="/dashboard/athlete/test">
                    <EditButton />
                  </Link>
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
