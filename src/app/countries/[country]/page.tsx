import { CountryType } from "@/types/types";
import React from "react";

const fetchCountry = async (country: string) => {
  const res = await fetch(
    `http://localhost:3000/api/country?country=${country}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch country");
  }
  const data = await res.json();
  return data;
};

type CountryProps = {
  params: { country: string };
};

const CountryPage = async ({ params }: CountryProps) => {
  const country: CountryType = await fetchCountry(params.country);
  return <div></div>;
};

export default CountryPage;
