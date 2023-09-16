import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import authOptions from "../api/auth/[...nextauth]/authOpts";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("auth/login");

  if (session?.user.role == "admin") redirect("/admin");

  return <>{children}</>;
}
