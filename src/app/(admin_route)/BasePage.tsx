"use client";
import { Alert, Modal } from "antd";
import React, { ReactNode, Suspense } from "react";

import { useAppSelector } from "@/hooks";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { selectors as toastSelectors } from "@/redux/toast";
interface BasePageProps {
  children: ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  const toast = useAppSelector(toastSelectors.toast);

  const alertTips = (
    <Alert
      showIcon
      message={toast.title}
      description={toast.msg}
      type={toast.type}
    />
  );

  return (
    <div className="bg-red-100">
      <Modal
        footer={null}
        title={null}
        open={toast.show}
        className="custom-modal"
        closeIcon={false}
      >
        {alertTips}
      </Modal>

      <Navbar />

      <Sidebar variation="Secondary" />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default BasePage;
