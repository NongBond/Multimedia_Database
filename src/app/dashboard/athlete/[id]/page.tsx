"use client";
import { CountryType } from "@/types/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const EditAthletePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
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
    const localImageUrl = URL.createObjectURL(item);
    setInput((prev) => {
      return { ...prev, picture: localImageUrl };
    });
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

  const fetchAthleteData = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/athlete/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch athlete");
      }
      const data = await res.json();
      setInput(data);
    } catch (err) {
      console.error("Error fetching athlete:", err);
    }
  }, [id]);

  useEffect(() => {
    const fetchcountries = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/country`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch country");
        }
        const data = await res.json();
        setCountries(data);
        await fetchAthleteData();
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchcountries();
  }, [fetchAthleteData]);

  useEffect(() => {
    fetchAthleteData();
  }, [fetchAthleteData]);

  const handleOldPictureClick = async () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
    const newUrl = await uploadPicture();
    console.log(newUrl);
    setInput((prev) => {
      return { ...prev, picture: newUrl };
    });
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(input);

      if (file) {
        const newUrl = await uploadPicture();
        setInput((prev) => {
          return { ...prev, picture: newUrl };
        });
      }

      const date = new Date(input.dateOfBirth);
      input.dateOfBirth = date.toISOString();
      const res = await fetch(`http://localhost:3000/api/athlete/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      window.location.href = `/athlete/${data.id}`;
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  return (
      <div>
        <form onSubmit={submitData} className="grid-cols-10">
          <div className="w-full grid-cols-4">
            <Image
              src={input.picture ? input.picture : "/blank_user.jpeg"}
              alt="athlete picture"
              width={50}
              height={50}
              onClick={handleOldPictureClick}
              className="w-40 h-40 cursor-pointer block mx-auto m-8"
            />
            <input
              type="file"
              name="picture"
              id="fileInput"
              onChange={handleChangeImg}
              className="hidden"
            />
          </div>
          <div className="grid-cols-6">
            <div className="flex flex-col gap-6 text-xl">
              <input
                type="text"
                placeholder="Full Name"
                value={input.name}
                name="name"
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Bib Number"
                name="bibNo"
                value={input.bibNo}
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="classification"
                name="classification"
                value={input.classification}
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
                onChange={handleChange}
              />
              <select
                name="gender"
                id="gender"
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
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
                name="countryId"
                id="country"
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
                onChange={handleChange}
                value={input.countryId}
              >
                {" "}
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
                value={input.dateOfBirth.split("T")[0]}
                className="p-2 rounded-md mx-auto text-black w-[30rem]"
                onChange={handleChange}
              />
              <button
                type="submit"
                className=" bg-yellow-500 hover:bg-white px-6 py-3 text-lg rounded-xl mt-10 w-[30rem] text-white hover:text-yellow-500 mx-auto"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default EditAthletePage;
