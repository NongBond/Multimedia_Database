"use client";
import React, { useState, useEffect } from "react";
import { AthleteType, CountryType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

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

const fetchCountry = async () => {
  const res = await fetch(`http://localhost:3000/api/country`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch country");
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
  const [country, setCountry] = useState<CountryType[]>([]);
  const [athletes, setAthletes] = useState<AthleteType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<AthleteType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAthlete();
      const countryData = await fetchCountry();
      setAthletes(data);
      setCountry(countryData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredAthletes =
      selectedCountry === "all"
        ? athletes
        : athletes.filter((athlete) => athlete.country.name === selectedCountry);
    setSearchResults(filteredAthletes.filter(athlete => athlete.bibNo.includes(searchQuery) || athlete.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [athletes, selectedCountry, searchQuery]);

  return (
    <div className="px-28">
      <div className="mt-5 text-white">
        <label htmlFor="country-filter">Filter by Country:</label>
        <select
          id="country-filter"
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="ml-2 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="all">All</option>
          {country.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by Bib No or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-2 p-2 rounded-md bg-gray-100 text-gray-700"
        />
      </div>
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((athlete) => (
            <tr key={athlete.id} className="border-b-2 border-gray-500 ">
              <td className="p-3 text-base text-gray-700 border border-black">
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
              <td className="p-3 text-base text-gray-700 border border-black">{athlete.bibNo}</td>
              <td className="p-3 text-base text-gray-700 border border-black">
              {
                   <div className="flex flex-row align-center justify-center gap-20">
                   <Image
                      src={athlete.picture}
                      alt={`${athlete.name}'s picture`}
                      width={100}
                      height={100}
                      style={{ alignSelf: 'center' }}
                    />
                    <p style={{ alignSelf: 'center', margin: 0 }}>{athlete.name}</p>
                  </div>
                  }
              </td>
              <td className="p-3 text-base text-gray-700 border border-black">{athlete.gender}</td>
              <td className="p-3 text-base text-gray-700 border border-black">
                {setDateFormat(athlete.dateOfBirth)}
              </td>
              <td className="p-3 text-base text-gray-700 border border-black">
                {athlete.classification}
              </td>
              <td>
                <Link href={`/athlete/${athlete.id}`}>
                  <button className="bg-slate-700 px-6 py-3 text-m rounded-xl text-white">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthletePage;
