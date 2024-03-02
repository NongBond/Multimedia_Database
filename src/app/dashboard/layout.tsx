"use client";
import { useSession } from "next-auth/react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = useSession();
  if (session.status === "loading") {
    return (
      <div className="block m-auto border-b-2 border-sky-600 h-10 w-10 animate-spin rounded-full"></div>
    );
  }
  if (session.status !== "authenticated" || !session.data?.user.isAdmin) {
    return (
      <div className="text-3xl text-center text-white pt-5">
        You do not have permission
      </div>
    );
  }
  return (
    <div className="grid grid-flow-col-dense gird-cols-10 h-full">
      <div className="col-span-2 bg-slate-600 w-[350px] h-full">
        <Sidebar />
      </div>
      <div className="col-span-8 bg-slate-700">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
