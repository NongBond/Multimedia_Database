"use client";
import { stat } from "fs";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="block m-auto border-b-2 border-sky-600 h-10 w-10 animate-spin rounded-full"></div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="border-b-2 mt-5 pb-8">
        <form className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="email" className="text-white font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 rounded-md bg-slate-800  text-white w-[25rem]"
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="password" className="text-white font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-2 rounded-md bg-slate-800  text-white w-[25rem]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-black bg-slate-400 py-3 px-6 rounded-xl w-[25rem]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div>
        <button
          onClick={() => signIn("google")}
          className="text-black bg-slate-400 py-3 px-6 mt-4 rounded-xl w-[25rem]"
        >
          Login with google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
