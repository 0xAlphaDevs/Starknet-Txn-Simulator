import { ethers } from "ethers";
import { openAiChatAbi } from "./abi";

export const callAiAgent = async () => {
  const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com", {
    name: "Galadriel Devnet",
    chainId: 696969,
  });
  const contractAddress = "0x95Fa2db57575227F013B41C5D45604d73EE301B0"; // REPLACE_ME

  const contract = new ethers.Contract(
    contractAddress,
    openAiChatAbi,
    provider
  );

  console.log(contract);

  // const chatId = await contract.getCurrentChatId();
  // console.log(`Chat ID: ${chatId}`);

  // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
  let lastResponse = await contract.getMessageHistoryContents(1);

  console.log(`Last response: ${lastResponse}`);

  return contract;
};
