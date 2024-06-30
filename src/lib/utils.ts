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

export function buildCallData(params: any, values: any) {
  const callData = [`0x${params.length.toString(16)}`];
  for (let i = 0; i < params.length; i++) {
    if (params[i].type.includes("integer")) {
      callData[0] = `0x${(params.length + 1).toString(16)}`;
      callData.push(values[params[i].name]);
      callData.push("0x0");
    } else {
      callData.push(values[params[i].name]);
    }
  }
  return callData;
}
