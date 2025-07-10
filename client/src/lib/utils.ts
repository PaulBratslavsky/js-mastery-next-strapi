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

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};