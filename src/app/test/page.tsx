"use client";
import WalletBar from "@/components/WalletBar";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { getFunctionsForContract, testFunction } from "@/lib/simulate";
import { useState } from "react";
import { DecodedSelector } from "@/lib/decoder";
import { callAiAgent } from "@/lib/callAiAgent";

const Test = () => {
  const { address } = useAccount();
  const [contractFunctions, setContractFunctions] = useState<DecodedSelector>(
    {}
  );
  function handleClick() {
    testFunction(
      "0x026DD62b928c8cBBac8639323678Ab1332a3A905960130DB19435C2e6901190d"
    );
  }

  async function handleClick2() {
    callAiAgent();
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      {/* <WalletBar /> */}
      <button onClick={handleClick}>Test</button>
      <button onClick={handleClick2}>Test 2</button>
    </main>
  );
};

export default Test;
