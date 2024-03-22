import { CountryType } from "@/types/types";
import Image from "next/image";
import React from "react";


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

export default async function HomePage() {
  const countries: CountryType[] = await fetchCountry();
  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-auto pt-10 w-4/5">
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
              COUNTRY
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide text-center">
              <h1 className="flex flex-row items-center justify-center">
                GOLD
                <Image src="/images/medals/goldmedal.svg" alt="Gold Medal" width={20} height={20} />
              </h1>
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide text-center">
              <h1 className="flex flex-row items-center justify-center">
                Silver
                <Image src="/images/medals/silvermedal.svg" alt="Gold Medal" width={20} height={20} />
              </h1>
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide text-center">
              <h1 className="flex flex-row items-center justify-center">
                Bronze
                <Image src="/images/medals/bronzemedal.svg" alt="Gold Medal" width={20} height={20} />
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => {
            const goldMedals = country.medals.filter(
              (medal) => medal.type === "GOLD"
            ).length;
            const silverMedals = country.medals.filter(
              (medal) => medal.type === "SILVER"
            ).length;
            const bronzeMedals = country.medals.filter(
              (medal) => medal.type === "BRONZE"
            ).length;

            return (
              <tr key={country.id} className="border-b-2 border-gray-500 ">
                <td className="p-3 text-base text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={30}
                      height={30}
                    />
                    <span>{country.name}</span>
                  </div>
                </td>
                <td className="p-3 text-base text-gray-700">{goldMedals}</td>
                <td className="p-3 text-base text-gray-700">{silverMedals}</td>
                <td className="p-3 text-base text-gray-700">{bronzeMedals}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
