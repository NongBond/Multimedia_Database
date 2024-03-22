import { CountryType } from "@/types/types";
import Image from "next/image";
import React from "react";

type CountryProps = {
  params: { id: string };
};

const fetchCountry = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/country/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  return res.json();
};

const CountryPage = async ({ params }: CountryProps) => {
  const country: CountryType = await fetchCountry(params.id);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-28">
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
              COUNTRY
            </th>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
              BIB NO
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
              ATHLETE
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
              GENDER
            </th>
            <th className="w-30 p-3 text-sm font-semibold tracking-wide ">
              CLASSIFICATION
            </th>
          </tr>
        </thead>
        <tbody>
        {country.athletes &&
          country.athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>{country.name}</td>
              <td>{athlete.bibNo}</td>
              <td className="flex flex-row items-center justify-center gap-6">
                  <Image
                      src={athlete.picture}
                      alt={athlete.name}
                      width={50}
                      height={50}
                  />
                  {athlete.name}
              </td>
              <td>{athlete.gender}</td>
              <td>{athlete.classification}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
};

export default CountryPage;
