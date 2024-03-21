"use client";
import { CountryType } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { OptionHTMLAttributes, useEffect, useState } from "react";

type InputType = {
  id: string;
  eventNumber: string;
  name: string;
  classification?: string;
  gender: string;
  date: string;
  time: string;
  stage: string;
  status: string;
};

const AddEventPage: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    eventNumber: "",
    name: "",
    classification: "",
    gender: "",
    date: "",
    time: "",
    stage: "",
    status: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const date = new Date(input.date);
      input.date = date.toISOString();
      const res = await fetch(`http://localhost:3000/api/event/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      router.push(`/event`);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <div className="flex flex-wrap gap-6 text-xl">
          <input
            type="text"
            placeholder="Event Number"
            name="eventNumber"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
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
          <input
            type="date"
            placeholder="Date"
            name="date"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="time"
            placeholder="Time"
            name="time"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Stage"
            name="stage"
            className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Status"
            name="status"
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

export default AddEventPage;
