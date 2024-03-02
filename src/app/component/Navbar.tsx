import React from "react";
import UserLink from "./UserLink";
import Link from "next/link";
import { getAuthSession } from "@/util/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="bg-sky-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-6 text-lg">
        <div className="flex-1">
          <Link href="/" className="text-white text-2xl">
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
          <div className="text-white">
            <Link href="/schedule" className="focus:font-bold">
              Schedule
            </Link>
          </div>
          <div className="text-white">
            <Link href="/athlete" className="focus:font-bold">
              Athlete
            </Link>
          </div>
          <div className="text-white">
            <Link href="/countries" className="focus:font-bold">
              Country
            </Link>
          </div>
          {session?.user.isAdmin && (
            <div className="text-white">
              <Link href="/dashboard" className="focus:font-bold">
                Dashboard
              </Link>
            </div>
          )}
          <UserLink />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
