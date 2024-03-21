"use client";
import AddButton from "@/app/component/AddButton";
import EditButton from "@/app/component/EditButton";
import Search from "@/app/component/Search";
import { CountryType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type InputType = {
  name: string;
  abbreviation: string;
  flag: string;
};
const CountryPage = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState<File>();
  const [input, setInput] = useState({
    name: "",
    abbreviation: "",
    flag: "",
  });

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadflag = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "multiDatabase");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dubw9idqr/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/country`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch country");
        }
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await uploadflag();
      input.flag = url;
      const res = await fetch(`http://localhost:3000/api/country/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      window.location.reload();
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  return (
    <div className="px-8 pt-4">
      <div className="flex justify-between">
        <Search
          placeholder="Search country..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-row">
          <form
            onSubmit={submitData}
            className="flex flex-row items-center text-base gap-3"
          >
            <div className="flex flex-col">
              <label htmlFor="flag" className="text-black m-3">
                Picture
              </label>
              <input
                type="file"
                name="flag"
                onChange={handleChangeImg}
                className="p-2 rounded-md bg-yellow-500 mx-auto text-white w-[15rem]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="p-2 rounded-md bg-yellow-500 mx-auto text-white placeholder-gray-500"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Abbreviation"
                name="abbreviation"
                className="p-2 rounded-md bg-yellow-500 mx-auto text-white placeholder-gray-500"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className=" bg-yellow-500 px-6 py-2 text-lg rounded-xl text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
        <thead className="bg-gray-50 border-b-2 border-gray-500">
          <tr>
            <th className="w-32 p-3 text-m font-semibold tracking-wide border">
              Image
            </th>
            <th className="w-20 p-3 text-m font-semibold tracking-wide border">
              Name
            </th>
            <th className="w-20 p-3 text-m font-semibold tracking-wide border">
              Abbreviation
            </th>
            <th className="w-28 p-3 text-sm font-semibold tracking-wide border">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {countries
            .filter((country) =>
              country.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((country) => (
              <tr key={country.id} className="">
                <td className="p-3 border border-gray-400">
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
                <td className="p-3 border border-gray-400">
                  <p className="text-xl">{country.name}</p>
                </td>
                <td className="p-3 border border-gray-400">
                  <p className="text-xl">{country.abbreviation}</p>
                </td>

                <td className="p-3 border border-gray-400">
                  <div>
                    <Link href="/dashboard/athlete/test">
                      <EditButton/>
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

export default CountryPage;
