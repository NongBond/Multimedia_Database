"use client";
import { CountryType } from "@/types/types";
import { useEffect, useState } from "react";

const MedalsPage = () => {
  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const res = await fetch("/api/medals");
        if (res.ok) {
          const data = await res.json();
          setCountries(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching medals:", error);
      }
    };

    fetchMedals();
  }, []);
  const [countries, setCountries] = useState<CountryType[]>([]);

  return (
    <div>
      <h1>Medals by Country</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <h2>{country.name}</h2>
            <p>
              Gold:{" "}
              {country.medals.filter((medal) => medal.type === "GOLD").length},
              Silver:{" "}
              {country.medals.filter((medal) => medal.type === "SILVER").length}
              , Bronze:{" "}
              {country.medals.filter((medal) => medal.type === "BRONZE").length}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedalsPage;
