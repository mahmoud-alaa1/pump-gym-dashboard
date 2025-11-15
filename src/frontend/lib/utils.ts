import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { handleServiceError } from "@/frontend/errors/AppError";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callService<T>(fn: () => Promise<any>): Promise<T> {
  const res = await fn();

  if (!res.ok) {
    throw handleServiceError(res.error);
  }

  return res.data as T;
}
