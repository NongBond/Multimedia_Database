"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="mx-28 my-4 bg-slate-700 rounded-lg">
      <div className="text-2xl font-bold text-white text-center p-5 capitalize">
        {pathName.split("/").pop()}
      </div>
    </div>
  );
};

export default Navbar;
