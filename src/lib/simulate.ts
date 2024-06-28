import {
  Account,
  ArraySignatureType,
  CairoVersion,
  Call,
  constants,
  RpcProvider,
  selector,
  stark,
  SimulateTransactionResponse,
} from "starknet";
import { decodeTrace } from "./decoder";
import test from "node:test";

export type Function = {
  read: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
  write: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
};

export const simulateTransaction = async (
  walletAddress: string,
  address: string,
  functionName: string,
  calldata: string[]
) => {
  const simulationParameters = {
    functionName,
    calldata,
  };

  try {
    const provider = new RpcProvider({
      nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
    });

    const privateKey = ""; // not needed for simulation
    const contractAddress = address;
    const account = new Account(provider, walletAddress, privateKey);

    const nonce = await provider.getNonceForAddress(walletAddress!);
    const chainId = await account?.getChainId();
    const maxFee = "0x0";
    const version = 1;
    const cairoVersion = "1";

    const entrypoint = selector.getSelectorFromName(functionName);
    console.log("Entrypoint:", entrypoint);

    // const call: Call = {
    //   contractAddress,
    //   entrypoint,
    //   calldata: {
    //     // REPLACE_ME
    //     recipient:
    //       "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9",
    //     amount: "0x0",
    //   },
    // };

    // const signature = await signTransaction(
    //   account,
    //   walletAddress!,
    //   nonce,
    //   maxFee,
    //   version,
    //   chainId!,
    //   cairoVersion,
    //   call
    // );

    const signature: ArraySignatureType = [];

    calldata = [
      "0x1",
      contractAddress,
      entrypoint,
      "0x3",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x0",
      "0x0",
    ];

    const simulation = await simulateTransactions(
      walletAddress!,
      calldata,
      signature,
      nonce
    );
    console.log(simulation);
    if (simulation) {
      const trace = await decodeTrace(simulation[0].transaction_trace);
      console.log(trace);
    }
  } catch (err) {
    console.error("Error fetching data: ", err);
  }
};

const simulateTransactions = async (
  sender_address: string,
  calldata: string[],
  signature: ArraySignatureType,
  nonce: string
) => {
  const url = "https://free-rpc.nethermind.io/sepolia-juno/";
  // EXAMPLE PAYLOAD
  const payload = {
    jsonrpc: "2.0",
    method: "starknet_simulateTransactions",
    params: {
      block_id: "latest",
      transactions: [
        {
          type: "INVOKE",
          version: "0x1",
          sender_address,
          calldata,
          max_fee: "0x0",
          signature,
          nonce,
        },
      ],
      simulation_flags: ["SKIP_VALIDATE"],
    },
    id: 1,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const signTransaction = async (
  account: Account,
  walletAddress: string,
  nonce: string,
  maxFee: string,
  version: any,
  chainId: constants.StarknetChainId,
  cairoVersion: CairoVersion,
  call: Call
): Promise<ArraySignatureType> => {
  const signerDetails = {
    walletAddress,
    nonce,
    maxFee,
    version,
    chainId,
    cairoVersion,
    skipValidate: true,
  };

  const signer = account?.signer;
  const signature = await signer?.signTransaction([call], signerDetails);

  const formatedSignature = stark.formatSignature(signature);
  return formatedSignature;
};

export const testFunction = (walletAddress: string) => {
  console.log("Hello from simulate.ts!");
  simulateTransaction(
    walletAddress,
    "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "name",
    ["0x"]
  );
};

// simulateTransaction();
