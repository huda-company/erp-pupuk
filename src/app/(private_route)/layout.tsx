import { ConfigProvider } from "antd";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import theme from "@/theme/themeConfig";

import BasePage from "../(admin_route)/BasePage";
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
      <ConfigProvider theme={theme}>
        <BasePage>{children}</BasePage>
      </ConfigProvider>
    </>
  );
}
