"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className="container mx-auto mt-8 px-8 pt-4">
      <form onSubmit={submitData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
        <input
          type="text"
          placeholder="Event Number"
          name="eventNumber"
          className="input-field rounded-md h-10 px-4"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="input-field rounded-md h-10 px-4"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Classification"
          name="classification"
          className="input-field rounded-md h-10 px-4"
          onChange={handleChange}
        />
        <select name="gender" className="input-field rounded-md h-10 px-4" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="men">Men</option>
          <option value="female">Female</option>
        </select>
        <input type="date" placeholder="Date" name="date" className="input-field rounded-md h-10 px-4" onChange={handleChange} />
        <input type="time" placeholder="Time" name="time" className="input-field rounded-md h-10 px-4" onChange={handleChange} />
        <input type="text" placeholder="Stage" name="stage" className="input-field rounded-md h-10 px-4" onChange={handleChange} />
        <select name="status" className="input-field rounded-md h-10 px-4" onChange={handleChange}>
          <option value="result">Result</option>
          <option value="live">Live</option>
          <option value="start-list">Start-List</option>
        </select>
        <button
          type="submit"
          className="col-span-full bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
