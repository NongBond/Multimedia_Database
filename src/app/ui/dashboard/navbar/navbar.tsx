"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  if (pathName.split("/").length > 3 && pathName.split("/").pop() === "add"){
    return (
      <div className="mx-28 my-4 bg-yellow-500 rounded-lg">
        <div className="text-2xl font-bold text-white text-center p-5 capitalize">
          Adding Page
        </div>
      </div>
    );
  }
  else if (pathName.split("/").length > 3){
    return (
      <div className="mx-28 my-4 bg-yellow-500 rounded-lg">
        <div className="text-2xl font-bold text-white text-center p-5 capitalize">
          Editing Page
        </div>
      </div>
    );
  }

  return (
    <div className="mx-28 my-4 bg-yellow-500 rounded-lg">
      <div className="text-2xl font-bold text-white text-center p-5 capitalize">
        {pathName.split("/").pop()}
      </div>
    </div>
  );
};

export default Navbar;
