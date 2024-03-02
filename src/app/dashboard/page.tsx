"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="block m-auto border-b-2 border-sky-600 h-10 w-10 animate-spin rounded-full"></div>
    );
  }

  if (status !== "authenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  return <div>Dashboard</div>;
};

export default DashboardPage;
