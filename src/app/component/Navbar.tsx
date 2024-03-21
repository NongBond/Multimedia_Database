import React from "react";
import UserLink from "./UserLink";
import Link from "next/link";
import { getAuthSession } from "@/util/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-14 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-3 px-4 text-sm">
        <div className="flex-1">
          <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-sky-300 text-2xl">
            Home
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <form>
            <div className="form-control">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="input input-bordered w-[22rem] p-2 rounded-lg mr-6"
              />
            </div>
          </form>
          <div className="text-orange-300">
            <Link href="/athlete" className="focus:font-bold">
              Athlete
            </Link>
          </div>
          <div className="text-orange-300">
            <Link href="/countries" className="focus:font-bold">
              Country
            </Link>
          </div>
          <div className="text-orange-300">
            <Link href="/event" className="focus:font-bold">
              Events
            </Link>
          </div>
          {session?.user.isAdmin && (
            <div className="text-orange-300">
              <Link href="/dashboard" className="focus:font-bold">
                Dashboard
              </Link>
            </div>
          )}
          <UserLink/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
