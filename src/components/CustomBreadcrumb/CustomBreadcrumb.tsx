"use client";
import { Breadcrumb as AntdBreadcrumb } from "antd";

import { BreadcrumbProps } from "./config";
import CustomBreadcrumbItem from "./CustomBreadcrumbItem";

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <AntdBreadcrumb separator=">">
      {items.map((item, index) => (
        <AntdBreadcrumb.Item key={index}>
          {item.href ? (
            <CustomBreadcrumbItem href={item.href}>
              {item.title}
            </CustomBreadcrumbItem>
          ) : (
            <span className="text-black text-bold">{item.title}</span>
          )}
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
};

export default CustomBreadcrumb;
