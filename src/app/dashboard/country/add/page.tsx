"use client";
import AddButton from "@/app/component/AddButton";
import { CountryType } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type InputType = {
  name: string;
  abbreviation: string;
  flag: string;
};

const AddCountryPage: React.FC = () => {
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
  }, [countries]);

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await uploadflag();
      input.flag = url;
      const res = await fetch(`http://localhost:3000/api/athlete/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        // body: JSON.stringify({...input, flag: url}),
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
          <label htmlFor="flag" className="text-white text-xl m-3">
            Country Picture
          </label>
          <input
            type="file"
            name="flag"
            onChange={handleChangeImg}
            className="p-2 rounded-md bg-slate-800 mx-auto text-white"
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

export default AddCountryPage;
