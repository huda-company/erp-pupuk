import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import authOptions from "../api/auth/[...nextauth]/authOpts";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("auth/login");

  if (session?.user && String(session?.user.role) == "user") redirect("/user");

  return (
    <>
      <Navbar />

      <Sidebar variation="Secondary" />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
