import { ethers } from "ethers";
import { openAiChatAbi } from "./abi";

// export const callAiAgent = async (message: string) => {
//   const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com", {
//     name: "Galadriel Devnet",
//     chainId: 696969,
//   });
//   const contractAddress = "0x95Fa2db57575227F013B41C5D45604d73EE301B0"; // REPLACE_ME

//   const contract = new ethers.Contract(
//     contractAddress,
//     openAiChatAbi,
//     provider
//   );

//   // Call the startChat function
//   const transactionResponse = await contract.startChat(message);

//   const receipt = await transactionResponse.wait();
//   console.log(
//     `Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`
//   );

//   // Extract the chatId from the transaction response
//   const chatId = await contract.getCurrentChatId();
//   console.log(`Chat ID: ${chatId}`);

//   // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
//   let lastResponse = await contract.getMessageHistoryContents(chatId);
//   let newResponse = lastResponse;

//   console.log("Waiting for response: ");
//   while (newResponse === lastResponse) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     newResponse = await contract.getMessageHistoryContents(chatId);
//     console.log(".");
//   }
//   console.log(`Response generation completed with: ${newResponse}`);

//   return newResponse;
// };

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
