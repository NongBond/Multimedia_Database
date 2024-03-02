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
          <span className="cursor-pointer text-white" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login" className="text-white cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
};

export default UserLink;
