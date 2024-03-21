"use client";
import { AthleteType } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdAdd, MdDelete } from "react-icons/md";

const EditEventPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [input, setInput] = useState({
    eventNumber: "",
    name: "",
    classification: "",
    gender: "",
    date: "",
    time: "",
    stage: "",
    status: "",
    athletes: [] as AthleteType[],
  });
  const [allAthletes, setAllAthletes] = useState([] as AthleteType[]);

  useEffect(() => {
    const fetchAllAthletes = async () => {
      const res = await fetch(`http://localhost:3000/api/athlete`);
      const data = await res.json();
      setAllAthletes(data);
    };
    fetchAllAthletes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/event/${id}`);
      const data = await res.json();
      setInput(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDelete = async (athleteId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/event/${id}/athlete/${athleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      console.log(data.message);

      setInput((prev) => ({
        ...prev,
        athletes: prev.athletes.filter((athlete) => athlete.id !== athleteId),
      }));
    } catch (error) {
      console.error("Error deleting athlete:", error);
    }
  };

  const handleAdd = async (athleteId: string) => {
    console.log(athleteId);
    console.log(id);
    try {
      const res = await fetch(
        `http://localhost:3000/api/event/${id}/athlete/add/${athleteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ athleteId }),
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      console.log(data.message);

      const athleteRes = await fetch(
        `http://localhost:3000/api/athletes/${athleteId}`
      );
      const athlete = await athleteRes.json();

      setInput((prev) => ({
        ...prev,
        athletes: [...prev.athletes, athlete],
      }));
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(input);

      const res = await fetch(`http://localhost:3000/api/event/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      window.location.reload();
    } catch (error) {
      console.error("Error editting event:", error);
    }
  };
  const otherAthletes = allAthletes.filter(
    (athlete) => !input.athletes.some((e) => e.id === athlete.id)
  );

  return (
    <div>
      <div>
        <form onSubmit={submitData} className="grid-cols-10">
          <div className="grid-cols-6">
            <div className="flex flex-col gap-6 text-xl">
              <input
                type="text"
                placeholder="Full Name"
                value={input.name}
                name="name"
                className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Event Number"
                name="eventNumber"
                value={input.eventNumber}
                className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="classification"
                name="classification"
                value={input.classification}
                className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
                onChange={handleChange}
              />
              <select
                name="gender"
                id="gender"
                className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
                onChange={handleChange}
              >
                <option value={input.gender}>{input.gender}</option>
                {input.gender.toLowerCase() === "men" ? null : (
                  <option value="men">Men</option>
                )}
                {input.gender.toLowerCase() === "female" ? null : (
                  <option value="female">Female</option>
                )}
              </select>
              <select
                name="stage"
                id="stage"
                className="p-2 rounded-md bg-slate-800 mx-auto text-white w-[30rem]"
                onChange={handleChange}
                value={input.stage}
              >
                <option value={input.stage}>{input.stage}</option>
                <option value="final">Final</option>
                <option value="semi-final">Semi-Final</option>
                <option value="preliminary">Preliminary</option>
              </select>
              <button
                type="submit"
                className=" bg-slate-700 px-6 py-3 text-lg rounded-xl mt-10 w-auto ml-6 text-white"
              >
                Update
              </button>
            </div>
            <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
              <thead className="bg-gray-50 border-b-2 border-gray-500">
                <tr>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide ">
                    COUNTRY
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
                    BIB NO
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide ">
                    ATHLETE
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                    GENDER
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                    DOB
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
                    CLASSIFICATION
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {input.athletes.map((athlete) => (
                  <tr key={athlete.id} className="">
                    <td className="p-3 text-sm text-black">
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src={athlete.country.flag}
                          alt={`${athlete.country.name}'s flag`}
                          width={50}
                          height={50}
                          className="rounded-full w-20 h-20 mb-2"
                        />
                        <p>{athlete.country.name}</p>
                      </div>
                    </td>
                    <td className="p-3 border border-gray-400">
                      {athlete.bibNo}
                    </td>
                    <td className="p-3 border border-gray-400">
                      {
                        <div className="flex flex-row align-center justify-center gap-20">
                          <Image
                            src={athlete.picture}
                            alt={`${athlete.name}'s picture`}
                            width={100}
                            height={100}
                            style={{ alignSelf: "center" }}
                          />
                          <p style={{ alignSelf: "center", margin: 0 }}>
                            {athlete.name}
                          </p>
                        </div>
                      }
                    </td>
                    <td className="p-3 border border-gray-400">
                      {athlete.gender}
                    </td>
                    <td>{athlete.dateOfBirth}</td>

                    <td className="p-3 border border-gray-400">
                      {athlete.classification}
                    </td>
                    <td className="p-3 border border-gray-400">
                      <div className="flex flex-row justify-center gap-2">
                        <button onClick={() => handleDelete(athlete.id)}>
                          <MdDelete
                            width={50}
                            height={50}
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <table className="table-auto w-full border-2 border-gray-600 text-center mt-4 bg-slate-200">
                <thead className="bg-gray-50 border-b-2 border-gray-500">
                  <tr>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide ">
                      COUNTRY
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide ">
                      BIB NO
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      ATHLETE
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                      GENDER
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                      DOB
                    </th>
                    <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
                      CLASSIFICATION
                    </th>
                    <th className="w-28 p-3 text-sm font-semibold tracking-wide ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {otherAthletes.map((athlete) => (
                    <tr key={athlete.id} className="">
                      <td className="p-3 text-sm text-black">
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src={athlete.country.flag}
                            alt={`${athlete.country.name}'s flag`}
                            width={50}
                            height={50}
                            className="rounded-full w-20 h-20 mb-2"
                          />
                          <p>{athlete.country.name}</p>
                        </div>
                      </td>
                      <td className="p-3 border border-gray-400">
                        {athlete.bibNo}
                      </td>
                      <td className="p-3 border border-gray-400">
                        {
                          <div className="flex flex-row align-center justify-center gap-20">
                            <Image
                              src={athlete.picture}
                              alt={`${athlete.name}'s picture`}
                              width={100}
                              height={100}
                              style={{ alignSelf: "center" }}
                            />
                            <p style={{ alignSelf: "center", margin: 0 }}>
                              {athlete.name}
                            </p>
                          </div>
                        }
                      </td>
                      <td className="p-3 border border-gray-400">
                        {athlete.gender}
                      </td>
                      <td>{athlete.dateOfBirth}</td>

                      <td className="p-3 border border-gray-400">
                        {athlete.classification}
                      </td>
                      <td className="p-3 border border-gray-400">
                        <div className="flex flex-row justify-center gap-2">
                          <button onClick={() => handleAdd(athlete.id)}>
                            <MdAdd width={50} height={50} className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
