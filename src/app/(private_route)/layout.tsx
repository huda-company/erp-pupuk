import React, { useCallback, useRef, useState } from "react";
import { useOnClickOutsideElement } from "@/hooks";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import useMount from "@/hooks/useMount";
import Image from "next/image";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("auth/login");

  if (session?.user.role == "admin") redirect("/admin");

  return (
    <>
      <Navbar />

      <Sidebar />

      {children}
    </>
  );
}
