"use client";

import HeaderModule from "@/components/Header/HeaderModule";

export default function Page() {
  return (
    <div className="p-2 bg-white min-h-screen">
      {/* title */}
      <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 ">
        <HeaderModule title="Admin Dashboard" />
      </div>
      {/* body */}
    </div>
  );
}
