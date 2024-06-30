import { ethers } from "ethers";
import { openAiChatAbi } from "./abi";

export const callAiAgent = async (message: string) => {
  const result = await generateAiSummaryUsingGaladrielAgent(message);

  return result;
};

export async function generateAiSummaryUsingGaladrielAgent(message: string) {
  const res = await fetch("/api/generate-ai-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & { status: number };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
