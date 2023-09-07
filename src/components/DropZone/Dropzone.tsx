import React, { FC } from "react";
import { useDropzone } from "react-dropzone";

import clsxm from "@/utils/clsxm";
import { useUpdateEffect } from "@/hooks";

import { DropzoneProps } from "./types";
import Button from "../Button";
import Icon from "../Icon";
import Typography from "../Typography";

const Dropzone: FC<DropzoneProps> = ({ ...props }) => {
  const { onClick, onDrop, onChange, errorMessage } = props;
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
    });
  // const files = acceptedFiles.map((file, index) => (
  //   <li key={index}>{file.size} bytes</li>
  // ));

  useUpdateEffect(() => {
    const file = acceptedFiles[0];
    if (file) {
      onChange?.(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <div
        className={clsxm(
          "w-full rounded-2xl bg-white py-[1rem]",
          errorMessage !== "" && errorMessage ? "border-2 border-red-600" : ""
        )}
      >
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <div className="dropzone-content">
            <div className="flex flex-col items-center">
              <Icon src="/svg/UploadToCloud.svg" height={32} width={32} />
              <Typography
                variant="span"
                size="text-sm"
                color="text-adirondack"
                className="my-[0.75rem]"
              >
                {isDragActive
                  ? "Drop in here"
                  : errorMessage !== "" && errorMessage
                  ? errorMessage
                  : acceptedFiles[0]?.name ??
                    "Select a file or drag and drop here"}
              </Typography>
              <Typography
                variant="span"
                size="text-sm"
                className="mb-[1rem] text-[#000000]/[40%]"
              >
                JPG, PNG OR file size no more than 10MB
              </Typography>
              <Button
                type="button"
                onClick={onClick}
                size="xs"
                className="border-[#3D3A3B] bg-transparent font-thin text-[#3D3A3B]"
              >
                SELECT FILE
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <aside>
        <ul>{files}</ul>
      </aside> */}
    </div>
  );
};

export default Dropzone;
