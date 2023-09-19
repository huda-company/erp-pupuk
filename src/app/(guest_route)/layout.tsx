import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import authOptions from "../api/auth/[...nextauth]/authOpts";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.role == "user") redirect("/user");
  if (session?.user.role == "admin") redirect("/admin");

  return <>{children}</>;
}
