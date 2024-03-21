import { CountryType } from "@/types/types";
import Image from "next/image";
import React from "react";

type CountryProps = {
  params: { id: string };
};

const fetchCountry = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/country/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch athlete");
  }
  return res.json();
};

const CountryPage = async ({ params }: CountryProps) => {
  const country: CountryType = await fetchCountry(params.id);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {country.athletes &&
        country.athletes.map((athlete) => (
          <div key={athlete.id}>
            <h2>{athlete.name}</h2>
            <Image
              src={athlete.picture}
              alt={athlete.name}
              width={50}
              height={50}
            />
            <p>{athlete.classification}</p>
          </div>
        ))}
    </div>
  );
};

export default CountryPage;
