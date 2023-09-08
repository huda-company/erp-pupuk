"use client";
import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdAnalytics,
  MdOutlineSettings,
} from "react-icons/md";
import { BsChevronDown, BsFiles, BsServer, BsCart4 } from "react-icons/bs";
import clsxm from "@/utils/clsxm";
import Link from "next/link";
import { base_url } from "@/constants/env";

export default function Sidebar2() {
  const Menus = [
    { title: "Dashboard", src: "/admin", icon: <MdAnalytics /> },
    {
      title: "Purchasing",
      icon: <BsCart4 />,
      subMenus: [
        {
          title: "Supplier",
          src: `${base_url}/admin/supplier`,
          cName: "sub-nav",
        },
        {
          title: "Purchase Order",
          src: `${base_url}/admin/purchasing`,
          cName: "sub-nav",
        },
      ],
      isOpen: false,
    },
    {
      title: "Services",
      icon: <BsServer />,
      subMenus: [
        {
          title: "Service 1",
          src: `${base_url}/services/services1`,

          cName: "sub-nav",
        },
        {
          title: "Service 2",
          src: `${base_url}/services/services2`,

          cName: "sub-nav",
        },
        {
          title: "Service 3",
          src: `${base_url}/services/services3`,
        },
      ],
      isOpen: false,
    },
    {
      title: "Item / Barang",
      src: `${base_url}/admin/item`,
      icon: <BsFiles />,
    },
    { title: "Setting", src: "Setting", icon: <MdOutlineSettings /> },
  ];

  const [sideBarMenu, setSidebarMenu] = useState(Menus);
  const [open, setOpen] = useState(true);

  const setSubMenuOpen = (index: number) => {
    setSidebarMenu((prevMenus: any) => {
      return prevMenus.map((menu: any, i: number) => {
        if (i === index) {
          return { ...menu, isOpen: !menu.isOpen };
        }
        return menu;
      });
    });
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-0 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className=" h-screen flex justify-end mt-[2.5rem] bg-red-100">
        <button
          className="fixed lg:hidden z-90 bottom-10 right-8 bg-white w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-800 duration-300"
          onClick={toggleSidebar}
        >
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 m-auto"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
              />
            </svg>
          </span>
        </button>

        <div
          className={clsxm(
            "z-41 lg:w-72 bg-white h-screen relative duration-500",
            open ? "w-[100%]  " : "w-0 "
          )}
        >
          <ul className="pt-6">
            {sideBarMenu.map((Menu, index) => (
              <>
                <Link
                  onClick={() => setSubMenuOpen(index)}
                  key={`${Menu.title}-${index}`.trim()}
                  href={Menu.src ?? "#"}
                >
                  <li
                    key={index}
                    className="flex rounded-md p-2 cursor-pointer text-lg items-center gap-x-4 mt-2 hover:bg-lime-100"
                  >
                    {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                    <span className="flex-1">{Menu.title}</span>
                    {Menu.subMenus && (
                      <BsChevronDown
                        onClick={() => setSubMenuOpen(index)}
                        className={`${Menu.isOpen && "rotate-180"}`}
                      />
                    )}
                  </li>
                </Link>
                {Menu.subMenus && Menu.isOpen && open && (
                  <ul>
                    {Menu.subMenus.map((subMenuItem, idx) => (
                      <Link
                        key={`${Menu.title}-${subMenuItem.title}-${idx}`.trim()}
                        href={subMenuItem.src}
                      >
                        <li
                          key={idx}
                          className="ml-[1rem] flex px-5 cursor-pointer text-base text-center py-2 hover:bg-lime-100"
                        >
                          {subMenuItem.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
