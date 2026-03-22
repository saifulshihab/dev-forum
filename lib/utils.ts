import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getTagColor = (index: number) => {
  const colors = [
    "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20",
    "bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 border-teal-500/20",
    "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/20",
    "bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 border-orange-500/20",
    "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/20",
    "bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 border-pink-500/20"
  ];
  return colors[index % colors.length];
};

export const toSnakeCase = (str: string) => {
  if (!str?.length) return str;
  const text = str.replace(/_/g, " ").toLowerCase();
  return text[0].toUpperCase() + text.substring(1);
};
