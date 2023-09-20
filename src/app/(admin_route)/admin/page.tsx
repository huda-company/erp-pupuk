"use client";

import { Breadcrumb } from "antd";

import HeaderModule from "@/components/Header/HeaderModule";

import { AdminBcBaseItems } from "./config";

export default function Page() {
  return (
    <div className="p-2 bg-white min-h-screen">
      {/* title */}
      <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 ">
        <HeaderModule title="Admin Dashboard" />
        <Breadcrumb
          style={{ padding: 0 }}
          separator=">"
          items={AdminBcBaseItems}
        />
      </div>
      {/* body */}
    </div>
  );
}
