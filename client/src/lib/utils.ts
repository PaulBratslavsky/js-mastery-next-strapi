import { clsx, type ClassValue } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDevIcon(name: string) {
  const normalizedName = name.toLowerCase().replace(/[ .]/g, "-");
  return `devicon-${normalizedName}-plain`;
}

interface FormQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({
  params,
  key,
  value,
  }: FormQueryParams) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringify(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
  );
}
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromUrlQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringify(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNulls: true }
  );
}