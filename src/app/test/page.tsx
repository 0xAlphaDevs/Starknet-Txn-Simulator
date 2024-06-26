"use client";
import WalletBar from "@/components/WalletBar";
import { useNetwork, useExplorer } from "@starknet-react/core";

const Test = () => {
  const { chain } = useNetwork();
  const explorer = useExplorer();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <WalletBar />

      <span>{chain.name}</span>
      <a
        href={explorer.block({
          hash: "0x07f61cd8dedcc1978b36b2dd641b30d0b2c13190ebb356efa83e1981adf8e4ef",
          number: 456194,
        })}
        target="_blank"
        rel="noreferrer"
      >
        Go to {explorer.name}
      </a>
    </main>
  );
};

export default Test;
