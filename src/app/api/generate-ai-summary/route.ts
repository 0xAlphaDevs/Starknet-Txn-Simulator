import { NextRequest, NextResponse } from "next/server";
import { ethers, Wallet } from "ethers";
import { openAiChatAbi } from "@/lib/abi";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const { message } = await req.json();
  console.log("Generate AI Summary for Txn. :", message);
  // Call AI agent to generate summary
  try {
    const result = { summary: "This is a summary of the transaction" };

    // query the AI agent
    const provider = new ethers.JsonRpcProvider(
      "https://devnet.galadriel.com",
      {
        name: "Galadriel Devnet",
        chainId: 696969,
      }
    );
    const privateKey = process.env.PRIVATE_KEY as string;
    const wallet = new Wallet(privateKey, provider);

    console.log("Wallet address: ", wallet.address);

    const contractAddress = process.env.CONTRACT_ADDRESS as string;

    const contract = new ethers.Contract(
      contractAddress,
      openAiChatAbi,
      wallet
    );

    const prompt = `Here is a starknet transaction, summarize it in 2 lines for a non-tech person : ${message}`;
    const transactionResponse = await contract.startChat(prompt);

    const receipt = await transactionResponse.wait();
    console.log(
      `Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`
    );

    console.log(`Response generation started with message: "${message}"`);

    // Extract the chatId from the transaction response

    // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
    let chatId = await contract.getCurrentChatId();
    console.log(`Current chatId: ${chatId}`);

    let newResponse = await contract.getAssistantResponse(chatId);
    let lastResponse = newResponse;

    // print w/o newline
    console.log("Waiting for response: ");
    while (newResponse == lastResponse) {
      console.log("New response", newResponse);
      console.log("Last response", lastResponse);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      newResponse = await contract.getAssistantResponse(chatId);
      console.log("New response after othe call", newResponse);
    }

    console.log("Final response: ", newResponse);

    return NextResponse.json(JSON.stringify({ summary: newResponse }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
