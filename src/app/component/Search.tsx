import React from "react";
import { MdSearch } from "react-icons/md";

type SearchProps = {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ placeholder, onChange }: SearchProps) => {
  return (
    <div className="flex flex-row items-center">
      <MdSearch width={20} height={20} className="w-8 h-8" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent p-2 placeholder:text-black"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
