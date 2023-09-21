import { ConfigProvider } from "antd";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

import theme from "@/theme/themeConfig";

import BasePage from "./BasePage";
import authOptions from "../api/auth/[...nextauth]/authOpts";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("auth/login");

  if (session?.user && ["usr"].includes(String(session?.user.role.codeName))) {
    redirect("/user");
  }

  return (
    <>
      <ConfigProvider theme={theme}>
        <BasePage>{children}</BasePage>
      </ConfigProvider>
    </>
  );
}
