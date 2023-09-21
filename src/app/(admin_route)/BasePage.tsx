"use client";
import {
  Alert,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Modal,
  theme,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { ReactNode, Suspense, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import {
  BsCart4,
  BsFiles,
  BsFillPeopleFill,
  BsNewspaper,
  BsShop,
} from "react-icons/bs";
import { MdAnalytics, MdGroups2 } from "react-icons/md";

import { useAppSelector } from "@/hooks";

import { base_url } from "@/constants/env";

import Loading from "@/components/Loading";

import { persistor } from "@/redux/store";
import { selectors as toastSelectors } from "@/redux/toast";
interface BasePageProps {
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();
  const toast = useAppSelector(toastSelectors.toast);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const alertTips = (
    <Alert
      showIcon
      message={toast.title}
      description={toast.msg}
      type={toast.type}
    />
  );

  const sidebarItems = [
    {
      key: "1",
      icon: <MdAnalytics />,
      label: "Dashboard",
      onClick: () => {
        router.push("/admin");
      },
    },
    {
      key: "2",
      icon: <BsCart4 />,
      label: "Purchasing",
      children: [
        {
          key: "Supplier",
          icon: <BsFillPeopleFill />,
          label: "Supplier",
          onClick: () => {
            router.push(`${base_url}/admin/supplier`);
          },
        },
        {
          key: "Purchase Order",
          icon: <BsNewspaper />,
          label: "Purchase Order",
          onClick: () => {
            router.push(`${base_url}/admin/purchase`);
          },
        },
      ],
    },
    {
      key: "3",
      icon: <BsFiles />,
      label: "Item",
      onClick: () => {
        router.push(`${base_url}/admin/item`);
      },
    },
    {
      key: "4",
      icon: <BsShop />,
      label: "Branches",
      onClick: () => {
        // router.push(`${base_url}/admin/branch`);
      },
    },
    {
      key: "5",
      icon: <MdGroups2 />,
      label: "User",
      onClick: () => {
        router.push(`${base_url}/admin/user`);
      },
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      onClick: () => handleLogout(),
      label: "Logout",
    },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: `${base_url}/auth/login` });
    persistor.purge();
  };

  return (
    <div>
      <Modal
        centered
        footer={null}
        title={null}
        open={toast.show}
        className="custom-modal"
        closeIcon={false}
      >
        {alertTips}
      </Modal>

      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <div className="flex flex-col ">
            <div className="flex flex-row justify-center items-center ">
              <Image
                src="/logo.png"
                width={60}
                height={60}
                alt="FlowBite Logo"
              />
              <span className="self-center text-lg font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                ERP
              </span>
            </div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex justify-between">
              <div>
                <Button
                  type="text"
                  icon={
                    collapsed ? (
                      <AiOutlineDoubleRight />
                    ) : (
                      <AiOutlineDoubleLeft />
                    )
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <span className="text-2xl">PT ANUGERAH TANI MAKMUR</span>
              </div>
              <div className="flex flex-row">
                <span className="">Hi, {data?.user.email}</span>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Image
                    width={60}
                    height={10}
                    src="/logo.png"
                    alt="user photo"
                  />
                </Dropdown>
              </div>
            </div>
          </Header>

          <Suspense fallback={<Loading />}>
            <Content
              style={{
                margin: "8px",
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Suspense>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasePage;
