"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserLink = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <span
            className="cursor-pointer text-orange-300"
            onClick={() => signOut()}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login" className="text-orange-300 cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
};

export default UserLink;
