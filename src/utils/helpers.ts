import { AxiosError, AxiosRequestConfig } from "axios";
import { FormEvent } from "react";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const GeneratePageTitle = (pathname: string) => {
  return pathname
    .substring(pathname.lastIndexOf("/"), pathname.length)
    .replaceAll("/", "")
    .split("-")
    .map(str => {
      return capitalizeFirstLetter(str);
    })
    .join(" ");
};

export const camelize = (string: string) => {
  return string
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    ?.replace(/\s+/g, "");
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const limitInputLength =
  (limit: number) => (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    if (currentTarget.value.length >= limit)
      currentTarget.value = Math.max(0, parseInt(currentTarget.value))
        .toString()
        .slice(0, limit);
  };

export const maxLength =
  (limit: number) => (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    if (currentTarget.value.length >= limit)
      currentTarget.value = currentTarget.value.toString().slice(0, limit);
  };

export const generateRandomString = (maxLength = 8) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < maxLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getExtension = (string: string) => {
  return string.split(".").pop()?.toLowerCase();
};

export const getExtensionFromLink = (string: string) => {
  return string.split(".").pop()?.split("?")[0].toLowerCase();
};

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const openLink = (link: string) => {
  const newWindow = window.open(link, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
