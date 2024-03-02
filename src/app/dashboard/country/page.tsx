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
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  return (
    <div className="px-8 bg-slate-200 pt-4">
      <div className="flex justify-between">
        <Search placeholder="Search country..." />
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
                className="p-2 rounded-md bg-cyan-700 mx-auto text-black w-[15rem]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="p-2 rounded-md bg-cyan-700 mx-auto text-black "
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Abbreviation"
                name="abbreviation"
                className="p-2 rounded-md bg-cyan-700 mx-auto text-black "
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className=" bg-cyan-700 px-6 py-2 text-lg rounded-xl text-black"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <table className="table-auto w-full text-center mt-2 text-black">
        <thead className=" ">
          <tr>
            <th className="w-32 p-3 text-2xl font-semibold tracking-wide ">
              Image
            </th>
            <th className="w-20 p-3 text-2xl font-semibold tracking-wide ">
              Name
            </th>
            <th className="w-20 p-3 text-2xl font-semibold tracking-wide ">
              Abbreviation
            </th>
            <th className="w-28 p-3 text-2xl font-semibold tracking-wide ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id} className="">
              <td className="p-3 text-base text-black">
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
              <td className="p-3 text-sm text-black">
                <p className="text-xl">{country.name}</p>
              </td>
              <td className="p-3 text-base text-black">
                <p className="text-xl">{country.abbreviation}</p>
              </td>

              <td className="p-3 text-base text-black">
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

export default CountryPage;
