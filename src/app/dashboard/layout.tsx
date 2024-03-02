"use client";
import { useSession } from "next-auth/react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import { useRouter } from "next/navigation";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") {
    return (
      <div className="block m-auto border-b-2 border-sky-600 h-10 w-10 animate-spin rounded-full"></div>
    );
  }
  if (session.status !== "authenticated" || !session.data?.user.isAdmin) {
    return router.push("/");
  }
  return (
    <div className="grid grid-flow-col-dense gird-cols-10 min-h-[45rem]">
      <div className="col-span-2 bg-cyan-600 w-[350px] ">
        <Sidebar />
      </div>
      <div className="col-span-8 ">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
