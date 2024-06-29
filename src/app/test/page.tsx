"use client";
import WalletBar from "@/components/WalletBar";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { getFunctionsForContract, testFunction } from "@/lib/simulate";
import { useState } from "react";
import { DecodedSelector } from "@/lib/decoder";

const Test = () => {
  const { address } = useAccount();
  const [contractFunctions, setContractFunctions] = useState<DecodedSelector>(
    {}
  );
  function handleClick() {
    testFunction(
      "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9"
    );
  }

  async function handleClick2() {
    const functions = await getFunctionsForContract(
      "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
    );
    console.log(functions);
    setContractFunctions(functions);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      {/* <WalletBar /> */}
      <button onClick={handleClick}>Test</button>
      <button onClick={handleClick2}>Test 2</button>
      {Object.entries(contractFunctions).map(([key, value]): any => {
        return (
          <div key={key}>
            {key} : {value.name} :{" "}
            {Object.entries(value.inputs).map(([k, v]) => {
              return (
                <div key={k}>
                  {k} : {v.name} : {v.type}
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
};

export default Test;
