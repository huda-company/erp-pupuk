"use client";

import { useAppSelector } from "@/hooks";
import { selectors as billSelectors } from "@/redux/bill";

export default function Page() {
  const searchInput = useAppSelector(billSelectors.searchInput);
  console.log("searchInput", searchInput);

  return (
    <div className="p-4 sm:ml-64 bg-red-100 h-screen">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-11">
        <h1>
          <u>Admin Dashboard </u>
        </h1>
      </div>

      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-11">
        <h1>
          <u>Admin Dashboard</u>
        </h1>
      </div>
    </div>
  );
}
