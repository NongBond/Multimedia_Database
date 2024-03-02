import { CountryType } from "@/types/types";
import React from "react";
import Image from "next/image";

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

const CountriesPage = async () => {
  const contries: CountryType[] = await fetchCountry();
  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-10">
      <h1 className="font-bold text-2xl">All Countries</h1>
      <div className="flex flex-row gap-20 px-10">
        {contries.map((country) => (
          <div
            key={country.id}
            className="flex flex-col items-center justify-center gap-4 bg-gray-400 p-5 rounded-xl w-60 h-60"
          >
            <h2 className="text-xl font-bold">{country.name}</h2>
            <Image
              src={country.flag}
              alt={country.name}
              width={100}
              height={100}
            />
            <div>
              <button className="bg-slate-700 text-gray-100 p-3 rounded-xl">
                View Athletes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;