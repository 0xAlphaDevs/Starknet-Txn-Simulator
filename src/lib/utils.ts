import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { validateAndParseAddress } from "starknet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateStarknetAddress(address: string) {
  console.log("Validating address: ", address);
  if (!address) {
    return false;
  }
  try {
    const result = validateAndParseAddress(address);
    console.log("Result: ", result);
    return result;
  } catch (error) {
    return false;
  }
}
