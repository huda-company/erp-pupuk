"use client";

import HeaderModule from "@/components/Header/HeaderModule";

export default function Page() {
  return (
    <div className="p-4 sm:ml-64 bg-white h-screen">
      {/* title */}
      <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
        <HeaderModule title="Admin Dashboard" />
      </div>
      {/* body */}
    </div>
  );
}
