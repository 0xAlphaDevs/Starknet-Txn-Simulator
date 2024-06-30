import React, { useState } from "react";
import { Button } from "./ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { sampleContractAddress } from "@/lib/sampleData";
import NewSimulationForm from "./newSimulationForm";

const NewSimulation = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSimulationStarted(true);
          }}
          className="rounded-[10px] text-lg font-semibold"
        >
          + New Simulation
        </Button>
      </div>

      {simulationStarted ? (
        <NewSimulationForm setSimulationStarted={setSimulationStarted} />
      ) : (
        <div className="flex flex-col gap-8 items-center mt-12">
          <p className="text-2xl font-semibold">
            Steps to get started with Stark Simulator AI{" "}
          </p>
          <div className="flex flex-col items-start gap-4 py-8">
            <div className="flex gap-2 items-center ">
              <p> 1. </p>
              <p> Click on new simulation 👆🏻 button to get started</p>
            </div>
            <div className="flex gap-2 ">
              <p>2.</p>
              <div className="flex flex-col gap-2 items-start">
                <p> Copy your contract address </p>
                <p className="text-muted-foreground text-sm">
                  For Example : USDC contract address
                </p>
                <div className="bg-black p-2 rounded-[15px] text-white flex gap-4 w-full">
                  <p className="text-md">{sampleContractAddress}</p>
                  <button
                    onClick={() => copyToClipboard(sampleContractAddress)}
                    className=" p-1 text-sm rounded-[20px]"
                  >
                    {isCopied ? (
                      <CopyCheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <p> 3. </p>
              <p>
                {" "}
                Select the function and enter the params to simulate a
                transaction :/
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSimulation;
