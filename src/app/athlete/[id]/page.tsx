import { AthleteType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fetchAthlete = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/athlete/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  return res.json();
};

const calculateAge = (date: string) => {
  const dateOfBirth = new Date(date);
  const now = new Date();
  let age = now.getFullYear() - dateOfBirth.getFullYear();

  const monthDiff = now.getMonth() - dateOfBirth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
};

const SingleAthletePage = async ({ params }: { params: { id: string } }) => {
  const athlete: AthleteType = await fetchAthlete(params.id);
  const goldMedals = athlete.medal.filter(
    (medal) => medal.type === "GOLD"
  ).length;
  const silverMedals = athlete.medal.filter(
    (medal) => medal.type === "SILVER"
  ).length;
  const bronzeMedals = athlete.medal.filter(
    (medal) => medal.type === "BRONZE"
  ).length;

  return (
    <div>
      <Link href="/athlete" className="bg-orange-300 px-4 py-2 rounded-lg">
        Back
      </Link>
      <div className="flex flex-row gap-8 items-center justify-center">
        <div>
          <Image
            src={athlete.picture}
            alt={`${athlete.name}'s picture`}
            width={50}
            height={50}
            className="w-52 h-56 "
          />
        </div>
        <div className="flex flex-col gap-4 text-white">
          <div>
            <p className="font-medium text-lg mb-2">Name:</p>
            <p className="pl-4">{athlete.name}</p>
          </div>
          <div>
            <h2 className="mb-3 font-medium text-lg">Country: </h2>
            <div className="flex flex-row items-center justify-center gap-3">
              <Image
                src={athlete.country.flag}
                alt={`${athlete.country.name}'s picture`}
                width={50}
                height={50}
              />
              <p>{athlete.country.name}</p>
            </div>
          </div>
          <div className="flex flex-row gap-1 text-white items-center ">
            <p className="font-medium text-lg">Age:</p>{" "}
            <p>{calculateAge(athlete.dateOfBirth)}</p>
          </div>
          <div className="flex flex-row gap-1 text-white items-center ">
            <p className="font-medium text-lg">Gender:</p>{" "}
            <p>{athlete.gender}</p>
          </div>
        </div>
      </div>
      <div>
        <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
          <thead className="bg-gray-50 border-b-2 border-gray-500">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
                GOLD
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide ">
                SILVER
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                BRONZE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={athlete.id} className="border-b-2 border-gray-500 ">
              <td className="p-3 text-base text-gray-700">{goldMedals}</td>
              <td className="p-3 text-base text-gray-700">{silverMedals}</td>
              <td className="p-3 text-base text-gray-700">{bronzeMedals}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleAthletePage;
