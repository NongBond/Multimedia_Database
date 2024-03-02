import React from "react";
import { MdSearch } from "react-icons/md";

type PlaceholderProps = {
  placeholder: string;
};

const Search = ({ placeholder }: PlaceholderProps) => {
  return (
    <div className="flex flex-row items-center">
      <MdSearch width={20} height={20} className="w-8 h-8" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent p-2"
      />
    </div>
  );
};

export default Search;
