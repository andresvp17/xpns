import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expense, ExpensesTable } from "@/types/index.d";
import { XPNS_PER_PAGE } from "./consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortByDate = (a: Expense, b: Expense) => {
  const dateA = new Date(a.creationDate)
  const dateB = new Date(b.creationDate)

  return dateB > dateA ? 1 : -1
}

export const sortBySpent = (array: Expense[]) => {
  const newSortedArray = array.sort((a, b) => b.spent - a.spent)

  return newSortedArray
}

export const lengthOfRange = (data: Expense[], page: number = 1) => {
  const totalPages = Math.ceil(data.length / XPNS_PER_PAGE)

  if (totalPages <= XPNS_PER_PAGE) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (page >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    page - 1,
    page,
    page + 1,
    '...',
    totalPages,
  ];
}