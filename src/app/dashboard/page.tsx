"use client";

import Navbar from "@/components/navbar";
import { useNetwork, useExplorer } from "@starknet-react/core";

const Test = () => {
  const { chain } = useNetwork();
  const explorer = useExplorer();
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen gap-12">
        <h1 className="text-4xl font-bold text-primary">Simulator Dashboard</h1>
        <span>Chain : {chain.name}</span>
      </main>
    </>
  );
};

export default Test;
