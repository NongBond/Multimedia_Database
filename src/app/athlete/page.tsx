"use client";
import { AthleteType } from "@/types/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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

const AthletePage = () => {
  const [athletes, setAthletes] = useState<AthleteType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAthlete();
      setAthletes(data);
    };
    fetchData();
  }, []);

  const filteredAthletes =
    selectedCountry === "all"
      ? athletes
      : athletes.filter((athlete) => athlete.country.name === selectedCountry);

  return (
    <div className="px-28">
      <div className="mb-4">
        <label htmlFor="country-filter">Filter by Country:</label>
        <select
          id="country-filter"
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="all">All</option>
          {/* Assume athletes have unique countries */}
          {athletes.map((athlete) => (
            <option key={athlete.country.name} value={athlete.country.name}>
              {athlete.country.name}
            </option>
          ))}
        </select>
      </div>
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-10 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
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
          </tr>
        </thead>
        <tbody>
          {filteredAthletes.map((athlete) => (
            <tr key={athlete.id} className="border-b-2 border-gray-500 ">
              <td className="p-3 text-sm text-gray-700">
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
              <td className="p-3 text-base text-gray-700">{athlete.bibNo}</td>
              <td className="p-3 text-base text-gray-700">
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
              <td className="p-3 text-base text-gray-700">{athlete.gender}</td>
              <td className="p-3 text-base text-gray-700">
                {setDateFormat(athlete.dateOfBirth)}
              </td>
              <td className="p-3 text-base text-gray-700">
                {athlete.classification}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthletePage;
