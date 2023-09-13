"use client";

import { Badge, Button as BtnAntd, Dropdown, List } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { ImFolderUpload } from "react-icons/im";

import useMount from "@/hooks/useMount";

import { base_url } from "@/constants/env";

import HeaderModule from "@/components/Header/HeaderModule";
import Typography from "@/components/Typography";

import { getPurchaseById } from "@/services/purchase/purchase";
import { APIPurchaseResp, PurcItemsRes } from "@/services/purchase/types";

import { StandardResp } from "@/app/api/types";

import { FE_PURCHASING_URL } from "../../config";

export default function Page() {
  const urlParam = useParams();

  const [itm, setItm] = useState<APIPurchaseResp | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [base64State, setBase64State] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [filename, setFilename] = useState<string>("");

  const data = itm?.billdocs.map((doc, i) => ({
    href: `${base_url}/uploads/purchasedoc/${doc.fileName}`,
    title: `${i + 1}. title : ${doc.title}`,
    description: doc.description,
    content: `${i + 1}. We supply a series of design principles, pra.`,
  }));

  const items = [
    {
      key: "1",
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
          console.log("file", result);
          setBase64State(result);
        };

        const aa = reader.readAsDataURL(file); // Read the file as data URL (base64)
        console.log("aaaaa", aa);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
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
          console.error("Invalid data URL format.");
        }

        // Create a FormData object and append the base64 string
        const formData = new FormData();
        formData.append("file", base64State);
        formData.append("filename", fileName);
        formData.append("purchase", String(urlParam?.id));
        formData.append("title", title);
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
          setTitle("");
          setDescription("");
          setFilename("");
          handleCallAPIs();
        }
      }
      // Convert the selected file to base64
      // const reader = new FileReader();
      // reader.onload = async () => {
      //   const base64String = reader.result as string;
      // };

      // reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64 bg-white h-screen">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Detail Purchase Order" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-4 ">
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
              <div className="flex flex-row gap-5 mt-[1rem] bg-blue-100 items-center px-2 rounded-lg">
                <ImFolderUpload
                  color="blue"
                  size={64}
                  onClick={() => handleUpload()}
                />
                <div>
                  <input
                    placeholder="title"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* <div>
                      <label htmlFor="description">Description:</label>
                      <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div> */}
                <input
                  className=""
                  name="file"
                  type="file"
                  accept=".jpg, .png, .pdf" // Specify accepted file types
                  onChange={handleFileInputChange}
                />
              </div>
              <div className="flex flex-col mt-[0.2rem]">
                <List
                  itemLayout="horizontal"
                  size="small"
                  pagination={{
                    position: "bottom",
                    align: "center",
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.title}>
                      <List.Item.Meta
                        title={`${item.title}`}
                        description={<a href={item.href}>click to see</a>}
                      />
                      {/* {item.content} */}
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
