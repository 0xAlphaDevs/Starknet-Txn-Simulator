"use client";

import Navbar from "@/components/navbar";
import NewSimulation from "@/components/newSimulation";
import { useNetwork, useExplorer } from "@starknet-react/core";

const Test = () => {
  const { chain } = useNetwork();
  const explorer = useExplorer();
  return (
    <>
      <Navbar />
      <main className="px-20">
        <div className="">
          <NewSimulation />
        </div>
        {/* <h1 className="text-4xl font-bold text-primary">Simulator Dashboard</h1>
        <span>Chain : {chain.name}</span> */}
      </main>
    </>
  );
};

export default Test;
