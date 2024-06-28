"use client";
import WalletBar from "@/components/WalletBar";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { testFunction } from "@/lib/simulate";

const Test = () => {
  const { address } = useAccount();
  function handleClick() {
    testFunction(address!);
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      {/* <WalletBar /> */}
      <button onClick={handleClick}>Test</button>
    </main>
  );
};

export default Test;
