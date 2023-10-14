"use client";

import { Breadcrumb, Card, Col, Row } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { BsFiles, BsFillPeopleFill, BsNewspaper, BsShop } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";

import HeaderModule from "@/components/Header/HeaderModule";

import { AdminBcBaseItems } from "./config";

export default function Page() {
  return (
    <div className="p-2 bg-white">
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
      <div className="p-2 border-2 min-h-screen border-gray-200 rounded-lg dark:border-gray-700 mt-2">
        <Row className="my-2" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Branches"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsShop key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="User"
                  value={11}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <MdGroups2 key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Supplier"
                  value={11}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsFillPeopleFill key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Item"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsFiles key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Purchase ORder"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsNewspaper key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="User"
                  value={11}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <MdGroups2 key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Supplier"
                  value={11}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsFillPeopleFill key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="p-2 bg-[#52c41a] flex justify-between gap-2">
              <Card className="border-[1rem] w-[70%]" bordered={true}>
                <Statistic
                  title="Item"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
              <div className="min-h-fit w-[30%]">
                <BsFiles key="user-icon" size="100%" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
