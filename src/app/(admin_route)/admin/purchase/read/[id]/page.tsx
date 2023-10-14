"use client";

import {
  Badge,
  Button as BtnAntd,
  Card,
  Divider,
  Dropdown,
  Input,
  InputRef,
  List,
  Select,
  Space,
} from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { ImFolderUpload } from "react-icons/im";

import { noop } from "@/utils/helpers";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import { base_url } from "@/constants/env";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";
import Typography from "@/components/Typography";

import { actions as utilsActions } from "@/redux/utils";

import { getPurchaseById } from "@/services/purchase/purchase";
import { APIPurchaseResp, PurcItemsRes } from "@/services/purchase/types";

import { StandardResp } from "@/app/api/types";

import { FE_PURCHASING_URL, ReadPurchBcItems } from "../../config";

export default function Page() {
  const dispatch = useAppDispatch();
  const urlParam = useParams();
  const router = useRouter();

  const inputRef = useRef<InputRef>(null);

  const [titleName, setTitleName] = useState("");
  const [optItems, setOptItems] = useState([
    "other",
    "invoice",
    "billing code",
    "file evidence",
  ]);

  const [itm, setItm] = useState<APIPurchaseResp | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [base64State, setBase64State] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [, setFilename] = useState<string>("");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleName(event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleName(String(event));
  };

  let index = 0;
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setOptItems([...optItems, titleName || `New item ${index++}`]);
    setTitleName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const data = itm?.billdocs.map((doc, i) => ({
    href: `${base_url}/uploads/purchasedoc/${doc.fileName}`,
    title: `${i + 1}. title : ${doc.title}`,
    description: doc.description,
    content: `${i + 1}. We supply a series of design principles, pra.`,
  }));

  const items = [
    {
      key: "generatePDF",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${FE_PURCHASING_URL.READ_GENERATE_PDF}/${urlParam?.id}`}
        >
          generate pdf
        </a>
      ),
    },
    {
      key: "edit",
      label: "edit",
      onClick: () => {
        router.push(`${FE_PURCHASING_URL.EDIT}/${urlParam?.id}`);
      },
    },
  ];

  const setInitFormVal = useCallback(() => {
    if (itm) {
      setItm(itm);
    }
  }, [itm]);

  useEffect(() => {
    setInitFormVal();
  }, [setInitFormVal]);

  const handleCallAPIs = async () => {
    const { success: purchSuccess, result: purchRes }: StandardResp =
      await getPurchaseById(String(urlParam?.id));
    if (purchSuccess) {
      setItm(purchRes);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result as string; // Get the base64 string
          setBase64State(result);
        };

        reader.readAsDataURL(file); // Read the file as data URL (base64)
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      await dispatch(
        utilsActions.callShowToast({
          type: "error",
          title: "Error",
          msg: "please select file",
          timeout: 2000,
        })
      );
      return;
    }

    try {
      if (base64State) {
        const matches = base64State?.match(/^data:(.*?);base64,(.*)$/);
        let fileName = "";

        if (matches) {
          const mimeType = matches[1];
          const extension = mimeType.split("/")[1];
          fileName = `file.${extension}`;
        } else {
          await dispatch(
            utilsActions.callShowToast({
              type: "error",
              title: "Error",
              msg: "Invalid data URL format",
              timeout: 2000,
            })
          );
          return;
        }

        // Create a FormData object and append the base64 string
        const formData = new FormData();
        formData.append("file", base64State);
        formData.append("filename", fileName);
        formData.append("purchase", String(urlParam?.id));
        formData.append("title", titleName);
        formData.append("description", description);

        // Send the FormData as part of a POST request
        const { status } = await axios.post(
          `${base_url}/api/billdoc`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for FormData
            },
          }
        );

        if (status == 200) {
          setSelectedFile(null);
          setTitleName("");
          setDescription("");
          setFilename("");
          handleCallAPIs();
        }
      }
    } catch (error) {
      await dispatch(
        utilsActions.callShowToast({
          type: "error",
          title: "Error",
          msg: String(error),
          timeout: 2000,
        })
      );
      return;
    }
  };

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Detail Purchase Order" />
          <CustomBreadcrumb items={ReadPurchBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-4 ">
          <div className="flex flex-row gap-4">
            {/* left side */}
            <div className="left-0 w-[65%] flex flex-col">
              <div className="flex justify-start items-center w-full">
                <div className="">
                  <Typography
                    color="red"
                    className="left-0 underline underline-offset-8 text-2xl"
                  >
                    PO : {itm?.poNo}
                  </Typography>
                </div>
                <div>
                  <Dropdown
                    className="w-[100px] rounded-lg ml-[1rem]"
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <BtnAntd
                      shape="circle"
                      icon={<BsThreeDots />}
                      type="primary"
                      size="middle"
                      style={{ backgroundColor: "#47AB1E" }}
                    ></BtnAntd>
                  </Dropdown>
                </div>
              </div>
              <div className=" flex flex-col gap-2 mt-[0.5rem]">
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Status</div>
                  <div>
                    :{" "}
                    <Badge
                      count={itm?.status.toUpperCase()}
                      showZero
                      color="#faad14"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Supplier</div>
                  <div>: {itm?.supplier.company}</div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Purchase Method</div>
                  <div>: {itm?.purchPaymentMethod}</div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Billing Code</div>
                  <div>: {itm?.billingCode}</div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">SO Number</div>
                  <div>: {itm?.soNumber}</div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Date</div>
                  <div>: {itm?.date?.toString().substring(0, 10)}</div>
                </div>
                <div className="flex flex-row gap-1.5 w-full">
                  <div className="w-[40%]">Exp Date</div>
                  <div>: {itm?.expDate?.toString().substring(0, 10)}</div>
                </div>
              </div>
              {/* table */}
              <div className="w-full mt-[1rem] px-4 py-5 border-2 border-gray-300 rounded-lg dark:border-gray-700 ">
                <div className="flex flex-row gap-4 bg-lime-200 rounder rounded-lg h-[3rem] py-[1rem]">
                  <div className="flex flex-col gap-1.5 w-[50%] ml-[1rem]">
                    Item
                  </div>
                  <div className="flex flex-col gap-1.5 w-[50%]">Qty</div>
                  <div className="flex flex-col gap-1.5 w-[50%]">Price</div>
                  <div className="flex flex-col gap-1.5 w-[50%]">Discount</div>
                  <div className="flex flex-col gap-1.5 w-[50%]">Total</div>
                </div>
                {itm?.items.map((elm: PurcItemsRes, idx) => {
                  return (
                    <>
                      <div
                        className="mt-[1rem] flex flex-row gap-4 ml-[1rem]"
                        key={idx}
                      >
                        <div className="flex flex-col gap-1.5 w-[50%]">
                          {elm.item.name}
                        </div>
                        <div className="flex flex-col gap-1.5 w-[50%]">
                          {elm.quantity}
                        </div>
                        <div className="flex flex-col gap-1.5 w-[50%]">
                          {elm.price}
                        </div>
                        <div className="flex flex-col gap-1.5 w-[50%]">
                          {elm.discount}
                        </div>
                        <div className="flex flex-col gap-1.5 w-[50%]">
                          {elm.total}
                        </div>
                      </div>
                    </>
                  );
                })}

                <div className="flex flex-row">
                  <div className="left-0 w-[65%]"></div>
                  <div className="right-0 w-[45%] items-end">
                    <div className="flex flex-col mt-[2rem] right-0 ">
                      <div className="flex flex row ">
                        <div className="left-0 w-[50%]">Discount Total</div>
                        <div className="right-0 w-[50%]">{itm?.discount}</div>
                      </div>

                      <div className="flex flex row ">
                        <div className="left-0 w-[50%]">Sub total</div>
                        <div className="right-0 w-[50%]">{itm?.subTotal}</div>
                      </div>

                      <div className="flex flex row">
                        <div className="left-0 w-[50%]">Tax</div>
                        <div className="right-0 w-[50%]">
                          {itm?.taxTotal ?? 0}
                        </div>
                      </div>

                      <div className="flex flex row">
                        <div className="left-0 w-[50%]">Grand Total</div>
                        <div className="right-0 w-[50%]">{itm?.grandTotal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="right-0 w-[35%] flex flex-col gap-y-4">
              <Typography
                color="red"
                className=" underline underline-offset-8 text-2xl"
              >
                Dokumen Pendukung
              </Typography>
              {/* billdoc attention */}
              <div className="w-full">
                <Card
                  type="inner"
                  title="!!! Attention !!!"
                  headStyle={{ backgroundColor: "#DB4827" }}
                >
                  <p>These are purchase order statuses : </p>
                  <p>1. DRAFT </p>
                  <p>2. APPROVED </p>
                  <p>3. RELEASED </p>

                  <p className="mt-[1rem]">
                    (-) Filename title will affect purchase order status
                  </p>
                  <p className="ml-[0.7rem]">{`(--) once invoice / billing code file uploaded, status will changed to be "APPROVED"`}</p>
                  <p className="my-[0.7rem] ml-[0.7rem]">{`(--) once FILE EVIDENCE (payment proof, etc) uploaded, status will changed to be "RELEASED"`}</p>
                </Card>
              </div>
              {/* billdoc uploader */}
              <div className="flex flex-row gap-5 mt-[1rem] bg-blue-100 items-center px-2 rounded-lg">
                <input
                  name="file"
                  type="file"
                  accept=".jpg, .png, .pdf" // Specify accepted file types
                  onChange={handleFileInputChange}
                />
                <div>
                  <Select
                    style={{ width: 200 }}
                    placeholder="filename title"
                    onChange={onSelectChange}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={titleName}
                            onChange={onNameChange}
                          />
                          <BtnAntd
                            type="text"
                            icon={<AiOutlinePlusCircle />}
                            onClick={addItem}
                          ></BtnAntd>
                        </Space>
                      </>
                    )}
                    options={optItems.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </div>
                <ImFolderUpload
                  color="blue"
                  size={60}
                  onClick={() => handleUpload()}
                />
              </div>
              {/* billdoc list */}
              <div className="flex flex-col mt-[0.2rem] h-[280px]">
                <List
                  itemLayout="horizontal"
                  size="small"
                  pagination={{
                    position: "bottom",
                    align: "center",
                    onChange: noop,
                    pageSize: 3,
                  }}
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.title}>
                      <List.Item.Meta
                        title={`${item.title}`}
                        description={
                          <a target="_blank" href={item.href}>
                            click to see
                          </a>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
