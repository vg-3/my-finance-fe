import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserInitials = (username: string) => {
  const names = username.split(" ");
  if (names.length > 1) {
    const initials = names[0][0] + names[1][0];
    console.log(initials);

    return initials.toUpperCase();
  } else {
    return username.substring(0, 2).toUpperCase();
  }
};

export function formatToINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export const getDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export function toLocalDateTimeString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
