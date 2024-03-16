"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";

type Props = {
  query: string;
};

const Search = ({ query }: Props) => {
  const SearchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(SearchParams);
    if (e.target.value) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div>
      <MdSearch width={20} height={20} className="w-8 h-8" />
      <input
        type="text"
        placeholder={query}
        className="bg-transparent p-2"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
