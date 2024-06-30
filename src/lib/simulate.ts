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
import {
  decodeTrace,
  getSelectors,
  getAbi,
  NETHERMIND_RPC_URL,
} from "./decoder";
import { fsync } from "fs";

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
  contractAddress: string,
  functionName: string,
  functionInputs: string[]
) => {
  // const simulationParameters = {
  //   functionName,
  //   calldata,
  // };

  try {
    const provider = new RpcProvider({
      nodeUrl: "https://free-rpc.nethermind.io/mainnet-juno/",
    });

    const nonce = await provider.getNonceForAddress(walletAddress); // no of transactions sent by the account

    // const chainId = await account?.getChainId();
    // const maxFee = "0x0";
    // const version = 1;
    // const cairoVersion = "1";

    const entrypoint = selector.getSelectorFromName(functionName); // get the selector for the function
    // console.log("Entrypoint:", entrypoint);

    const signature: ArraySignatureType = [];

    const calldata = ["0x1", contractAddress, entrypoint, ...functionInputs];

    console.log("Calldata:", calldata);

    const simulation = await simulateTransactions(
      walletAddress,
      calldata,
      signature,
      nonce
    );

    console.log("Simulation Response:", simulation);
    // LATER: decode trace
    if (!simulation[0].transaction_trace.execute_invocation.revert_reason) {
      const trace = await decodeTrace(simulation[0].transaction_trace);
      // console.log("Final output after decoder :", trace);
      return { ...trace, error: false };
    }
    return {
      error: true,
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
    };
  }
};

const simulateTransactions = async (
  sender_address: string,
  calldata: string[],
  signature: ArraySignatureType,
  nonce: string
) => {
  const url = "https://free-rpc.nethermind.io/mainnet-juno/";
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

    const res = await response.json();

    return res.result as any;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

// const signTransaction = async (
//   account: Account,
//   walletAddress: string,
//   nonce: string,
//   maxFee: string,
//   version: any,
//   chainId: constants.StarknetChainId,
//   cairoVersion: CairoVersion,
//   call: Call
// ): Promise<ArraySignatureType> => {
//   const signerDetails = {
//     walletAddress,
//     nonce,
//     maxFee,
//     version,
//     chainId,
//     cairoVersion,
//     skipValidate: true,
//   };

//   const signer = account?.signer;
//   const signature = await signer?.signTransaction([call], signerDetails);

//   const formatedSignature = stark.formatSignature(signature);
//   return formatedSignature;
// };

export const testFunction = (walletAddress: string) => {
  console.log("Hello from simulate.ts!", walletAddress);

  // READ totalSupply - 0 param
  // simulateTransaction(
  //   walletAddress,
  //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
  //   "totalSupply",
  //   ["0x0"]
  // );

  // transfer usdc -- 2 params (recipient, amount) -- we pass 0x0 as the last param for the integer
  simulateTransaction(
    walletAddress, // 0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9
    "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
    "transfer",
    [
      "0x3",
      "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9",
      "15",
      "0x0",
    ]
  );

  // transfer_from usdc -- 3 params (sender, recipient, amount) -- we pass 0x0 as the last param for the integer ❌
  // simulateTransaction(
  //   walletAddress, // 0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9
  //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
  //   "transfer_from",
  //   [
  //     "0x4",
  //     "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9", // sender
  //     "0x026DD62b928c8cBBac8639323678Ab1332a3A905960130DB19435C2e6901190d", // receiver
  //     "0x3", // should be less than or equal to the allowance
  //     "0x0",
  //   ]
  // );

  // approve usdc -- 2 params
  // simulateTransaction(
  //   walletAddress, // 0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9
  //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
  //   "approve",
  //   [
  //     "0x3",
  //     "0x026DD62b928c8cBBac8639323678Ab1332a3A905960130DB19435C2e6901190d",
  //     "9",
  //     "0x0",
  //   ]
  // );

  // allowance usdc -- 2 params (without integer so no need to add 0x0 in the calldata)
  // simulateTransaction(
  //   walletAddress, // 0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9
  //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
  //   "allowance",
  //   [
  //     "0x2",
  //     "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9",
  //     "0x026DD62b928c8cBBac8639323678Ab1332a3A905960130DB19435C2e6901190d",
  //   ]
  // );

  // balance_of - 1 param
  // simulateTransaction(
  //   walletAddress,
  //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8", // usdc contract
  //   "balance_of",
  //   [
  //     "0x1",
  //     "0x026DD62b928c8cBBac8639323678Ab1332a3A905960130DB19435C2e6901190d",
  //   ]
  // );
};

export const getFunctionsForContract = async (contractAddress: string) => {
  const provider = new RpcProvider({
    nodeUrl: NETHERMIND_RPC_URL,
  });
  try {
    const abi = await getAbi(contractAddress, provider);

    const selectors = getSelectors(abi);
    // console.log("Selectors:", selectors);
    return selectors;
  } catch (error) {
    return {
      status: true,
      message: "Error fetching data",
    };
  }
  // return error;
};

// simulateTransaction();
