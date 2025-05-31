import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDevIcon(name: string) {
  const normalizedName = name.toLowerCase().replace(/[ .]/g, "-");
  return `devicon-${normalizedName}-plain`;
}