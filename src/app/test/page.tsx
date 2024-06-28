"use client";
import WalletBar from "@/components/WalletBar";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { testFunction } from "@/lib/simulate";

const Test = () => {
  const { address } = useAccount();
  function handleClick() {
    testFunction(
      "0x036b0Fe7c0f3FB63184Ab34de7992395dBc22d6Ee711C29ebF3e33714f4393b9"
    );
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      {/* <WalletBar /> */}
      <button onClick={handleClick}>Test</button>
    </main>
  );
};

export default Test;
