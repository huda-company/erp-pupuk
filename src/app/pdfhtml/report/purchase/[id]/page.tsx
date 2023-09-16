/* eslint-disable @next/next/no-img-element */
"use client";
import { message, Table } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import terbilangIndo from "@/utils/terbilangIndo";
import useMount from "@/hooks/useMount";

import { getPurchaseById } from "@/services/purchase/purchase";
import { APIPurchaseResp, PurcItemsRes } from "@/services/purchase/types";

import { StandardResp } from "@/app/api/types";

const PdfExport: React.FC = () => {
  const urlParam = useParams();
  const pdfRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [itm, setItm] = useState<APIPurchaseResp | undefined>(undefined);
  const [tableDS, setTableDS] = useState<any[]>([]);

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const setInitFormVal = useCallback(async () => {
    if (itm) {
      await setItm(itm);
      const ds = itm?.items.map((x: PurcItemsRes, idx) => {
        return {
          key: idx,
          name: x.item.name,
          qty: x.quantity,
          price: x.price,
          total: x.total,
        };
      });
      await setTableDS(ds ?? []);
    }
  }, [itm]);

  useEffect(() => {
    setInitFormVal();
  }, [setInitFormVal]);

  const handleCallAPIs = async () => {
    const { success: purchSuccess, result: purchRes }: StandardResp =
      await getPurchaseById(String(urlParam?.id));
    if (purchSuccess) {
      await setItm(purchRes);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const generatePDF = async () => {
    if (pdfRef.current) {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfContent = pdfRef.current;

      // Convert the div content to a canvas
      const canvas = await html2canvas(pdfContent);
      const imgData = canvas.toDataURL("image/png");

      // Calculate the dimensions to maintain aspect ratio
      const aspectRatio = canvas.width / canvas.height;
      const width = 190; // Set your desired width in mm
      const height = width / aspectRatio;

      // Add the canvas as an image to the PDF
      pdf.addImage(imgData, "PNG", 5, 5, width, height); // Adjust the dimensions as needed

      // Save or display the PDF
      pdf.save(`${itm?.poNo}.pdf`);
    }
  };

  const handleAntdMsg = useCallback(() => {
    messageApi.open({
      type: "loading",
      content: (
        <>
          <div>
            <p>Please Wait. . </p>
            <p>You can click logo image to download pdf </p>
          </div>
        </>
      ),
      duration: 5,
    });
  }, [messageApi]);

  useEffect(() => {
    handleAntdMsg();
  }, [handleAntdMsg]);

  return (
    <div
      onClick={() => generatePDF()}
      ref={pdfRef}
      className="p-4"
      // className="p-4 border border-gray-400"
    >
      {contextHolder}
      <div className="flex flex-row w-full py-0">
        <div className="w-[45%] flex justify-end items-center">
          <img
            style={{ height: "200px", width: "200px" }}
            height={100}
            width={120}
            src="/logo.png"
            alt="Your Image"
            className=""
          />
        </div>
        <div className="w-[50%] right-0 flex flex-col align-text-middle text-green-800 leading-x-10 pt-[1.5rem]">
          <div className="w-full text-3xl pb-[1rem]">Anugerah Tani Makmur</div>
          <div className="w-full text-sm">
            Griya Kebaron Manis Selatan 1 / 22
          </div>
          <div className="w-full text-sm">Karangpillang - Surabaya</div>
          <div className="w-full text-sm">Jawa Timur - Indonesia</div>
          <div className="w-full text-sm">Telp 0812 1690 9936</div>
        </div>
      </div>
      {/* divider */}
      <div className="h-[4px] w-full bg-green-700"></div>
      {/* po title */}
      <div className="justify-center items-center ">
        <p className="flex justify-center items-center text-4xl">
          Purchase Order
        </p>
      </div>
      <div className="flex flex-row w-full mt-[2rem]">
        <div className="w-[50%] flex justify-start px-[11.7rem]">
          <div className="flex flex-col">
            <div>Tanggal PO</div>
            <div>Nomor PO</div>
            <div>Perihal</div>
            <div>Pembayaran</div>
          </div>
          <div className="flex flex-col">
            <div>: 4 Januari 2023</div>
            <div>: 001/ATM/DHS/I/2023</div>
            <div>: Order Pupuk</div>
            <div>: Tunai</div>
          </div>
        </div>
        <div className="flex flex-col pl-[15rem] justify-end">
          <div className="w-full">Kepada Yth</div>
          <div className="w-full">PT DAKARA HARAPAN SUKSES</div>
          <div className="w-full">Jl. TB Simatupang No. 02 Jakarta Selatan</div>
        </div>
      </div>
      {/* body */}
      <div className="px-[11.7rem]">
        <div className="flex flex-row mt-[1rem]">
          <p className="flex justify-center items-center text-md">
            Permintaan pembelian barang sebagai berikut :
          </p>
        </div>
        {/* item table */}
        <div className="mt-[1rem] flex justify-center items-center ">
          <Table
            dataSource={tableDS}
            columns={columns}
            pagination={false}
            rootClassName=" w-full"
          />
        </div>
        <div className="flex flex-row justify-end mt-[0.2rem] bg-white">
          <div className="flex flex-row justify-end py-[1rem]">
            <div className="flex flex-col">
              <p className="text-sm ">Sub Total</p>
              <p className="text-sm ">Tax</p>
              <p className="text-sm ">Grand Total</p>
            </div>
            <div className="flex flex-col px-[6rem]">
              <p className="text-sm ">: Rp {itm?.subTotal}</p>
              <p className="text-sm ">: Rp {itm?.taxTotal}</p>
              <p className="text-sm ">: Rp {itm?.grandTotal}</p>
            </div>
          </div>
        </div>
        <div className="flex mt-[1rem]">
          <p className=" text-md">
            Demikian Purchase Order ini kami buat atas perhatian dan
            kerjasamanya kami ucapkan terima kasih.
          </p>
        </div>
        <div className="flex mt-[1rem]">
          <p className=" text-md">Terbilang</p>
        </div>
        <div className="flex mt-[0.2rem]">
          <p className=" text-md">
            # {terbilangIndo(Number(itm?.grandTotal))} #
          </p>
        </div>
        <div className="flex flex-col mt-[1rem]">
          <p className=" text-md">Catatan</p>
          <p className="ml-[2rem] text-md">1</p>
          <p className="ml-[2rem] text-md">2</p>
        </div>
        <div className="flex mt-[1rem]">
          <p className=" text-md">
            Surabaya,{" "}
            {moment(itm?.date)
              .locale("id-ID")
              .format("D MMMM YYYY")}
          </p>
        </div>
        <div className="flex space-between w-full">
          <div className="w-[50%] flex justify-start">
            <div className="flex flex-col">
              <div>Hormat Kami</div>
            </div>
          </div>
          <div className="w-[50%] flex justify-end items-end ">
            <div className="">Tim Program</div>
          </div>
        </div>
        <div className="flex space-between w-full mt-[5rem]">
          <div className="w-[50%] flex justify-start">
            <div className="flex flex-col">
              <div className="underline">Didik Tri Anoegroho</div>
            </div>
          </div>
          <div className="w-[50%] flex justify-end items-end ">
            <div className=""></div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[4rem]">
          <p className="text-green-600 text-xs">
            Griya Kebaron Manis Selatan 1 / 22, Karangpillang - Surabaya - Jawa
            Timur - Indonesia | Telp 0812 1690 9936
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfExport;
