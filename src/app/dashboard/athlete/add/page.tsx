"use client";
import AddButton from "@/app/component/AddButton";
import { CountryType } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { OptionHTMLAttributes, useEffect, useState } from "react";

type InputType = {
  name: string;
  bibNo: string;
  classification: string;
  gender: string;
  countryId: string;
  dateOfBirth: string;
  picture: string;
};

const AddAthletePage: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [file, setFile] = useState<File>();
  const [input, setInput] = useState({
    name: "",
    bibNo: "0",
    classification: "",
    gender: "",
    countryId: "0",
    dateOfBirth: "",
    picture: "",
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

  const uploadPicture = async () => {
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
      const url = await uploadPicture();
      const date = new Date(input.dateOfBirth);
      input.dateOfBirth = date.toISOString();
      input.picture = url;
      const res = await fetch(`http://localhost:3000/api/athlete/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        // body: JSON.stringify({...input, picture: url}),
      });

      const data = await res.json();
      // router.push(`/athlete/${data.id}`);
      router.push(`/athlete`);
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <div className="block mb-6 mx-auto w-fit">
          <label htmlFor="picture" className="text-white text-xl m-3">
            Picture
          </label>
          <input
            type="file"
            name="picture"
            onChange={handleChangeImg}
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[20rem]"
          />
        </div>
        <div className="flex flex-wrap gap-6 text-xl">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Bib Number"
            name="bibNo"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="classification"
            name="classification"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <select
            name="gender"
            id="gender"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="men">Men</option>
            <option value="female">Female</option>
          </select>
          <select
            name="countryId"
            id="country"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
            value={input.countryId}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Date of Birth"
            name="dateOfBirth"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-700 px-6 py-3 text-lg rounded-xl text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAthletePage;
