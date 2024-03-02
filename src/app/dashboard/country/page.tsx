import AddButton from "@/app/component/AddButton";
import EditButton from "@/app/component/EditButton";
import Search from "@/app/component/Search";
import { AthleteType, CountryType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fetchCountry = async () => {
  const res = await fetch(`http://localhost:3000/api/country`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  const data = await res.json();
  return data;
};

const AthletePage = async () => {
  const countries: CountryType[] = await fetchCountry();
  return (
    <div className="px-8 bg-slate-600 pt-4">
      <div className="flex justify-between">
        <Search placeholder="Search country..." />
        <Link href="/dashboard/athlete/add">
          <AddButton />
        </Link>
      </div>
      <table className="table-auto w-full text-center mt-2 text-white">
        <thead className=" ">
          <tr>
            <th className="w-32 p-3 text-2xl font-semibold tracking-wide ">
              Image
            </th>
            <th className="w-20 p-3 text-2xl font-semibold tracking-wide ">
              Name
            </th>
            <th className="w-28 p-3 text-2xl font-semibold tracking-wide ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id} className="">
              <td className="p-3 text-base text-white">
                {
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={country.flag}
                      alt={`${country.name}'s picture`}
                      width={50}
                      height={50}
                    />
                    <p>{country.name}</p>
                  </div>
                }
              </td>
              <td className="p-3 text-sm text-white">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-xl">{country.name}</p>
                </div>
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
