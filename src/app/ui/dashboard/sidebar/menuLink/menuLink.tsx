"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  title: string;
  path: string;
}

const MenuLink = ({ item }: { item: MenuItem }) => {
  const pathName = usePathname();

  const isActive =
    pathName === item.path ? "text-white bg-cyan-700" : "text-gray-300";

  return (
    <Link
      href={item.path}
      className={`mx-6 p-2 rounded-lg text-lg ${isActive}`}
    >
      {item.title}
    </Link>
  );
};

export default MenuLink;
