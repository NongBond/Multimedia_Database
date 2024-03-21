import React from "react";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { useSession } from "next-auth/react";

const MENU = [
  {
    title: "Page",
    list: [
      { title: "Athlete", path: "/dashboard/athlete" },
      { title: "Country", path: "/dashboard/country" },
      { title: "Medal", path: "/dashboard/medal" },
      { title: "Event", path: "/dashboard/event" },
    ],
  },
];

const Sidebar = () => {
  const session = useSession();
  return (
    <div className="sticky">
      <div className="flex flex-row items-center">
        <Image
          src={session.data?.user.image || "/blank_user.jpeg"}
          alt="logo"
          width={100}
          height={100}
          className="rounded-full m-4 w-20 h-20"
        />
        <div className="flex flex-col">
          <span className="text-white text-xl pl-2">
            {session.data?.user.name}
          </span>
          <span className="text-yellow-300 text-xl pl-2">Admin</span>
        </div>
      </div>
      <ul>
        {MENU.map((category) => (
          <li key={category.title} className="flex flex-col text-yellow-400">
            <span className="text-yellow-300 text-xl p-3">{category.title}</span>
            {category.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
