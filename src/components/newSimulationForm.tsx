import * as React from "react";

import { Button } from "@/components/ui/button";
import Step1 from "./simulationStepper/step1";
import Step2 from "./simulationStepper/step2";
import Step3 from "./simulationStepper/step3";
import Step4 from "./simulationStepper/step4";
import { DecodedSelector } from "@/lib/decoder";
import { getFunctionsForContract, simulateTransaction } from "@/lib/simulate";
import Spinner from "./spinner";
import { buildCallData, validateStarknetAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAccount } from "@starknet-react/core";

interface SimulationResponse {
  status: boolean;
  message: string;
}

const NewSimulationForm = ({ setSimulationStarted }: any) => {
  const { address } = useAccount();
  const [contractFunctions, setContractFunctions] = React.useState<
    DecodedSelector | SimulationResponse
  >({});
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    contractAddress: "",
    network: "mainnet",
    // abi: "",
    selectedFunction: "",
    functionParams: [],
    functionParamsValues: {},
  });
  const [internalCalls, setInternalCalls] = React.useState<any[]>([]);

  const { toast } = useToast();

  const handleNextStep = async () => {
    if (step < 4) {
      if (step == 1) {
        // validate contract address
        if (!validateStarknetAddress(formData.contractAddress)) {
          // alert("Invalid contract address");
          toast({
            title: "Invalid contract address",
            description: "Please enter a valid contract address",
            variant: "destructive",
          });
          return;
        }
        setLoading(true);
        setLoadingMessage("Fetching ABI and listing functions...");
        console.log("Calling after step 1");
        const functions = await getFunctionsForContract(
          formData.contractAddress
        );
        console.log(functions);
        if (functions.status) {
          toast({
            title: "There was an error",
            description: "Error fetching ABI for this address.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        setContractFunctions(functions);
        setStep(step + 1);
        toast({
          title: "Successfully fetched contract functions",
          description: "You can now select a function to simulate",
        });
        setLoading(false);
      } else if (step == 2) {
        console.log("Calling after step 2");
        setStep(step + 1);
      } else if (step == 3) {
        // validate functionParamsValues
        const params: any = formData.functionParams;
        const paramsValues: any = formData.functionParamsValues;
        for (let i = 0; i < params.length; i++) {
          if (params[i].type.includes("integer")) {
            //@ts-ignore
            if (isNaN(paramsValues[params[i].name])) {
              toast({
                title: "Invalid input",
                description: "Please enter a valid integer value",
                variant: "destructive",
              });
              return;
            }
          }
          if (params[i].type.includes("address")) {
            //@ts-ignore
            if (!validateStarknetAddress(paramsValues[params[i].name])) {
              toast({
                title: "Invalid input",
                description: "Please enter a valid address",
                variant: "destructive",
              });
              return;
            }
          }
        }

        setLoading(true);
        setLoadingMessage("Simulating transaction...");
        console.log("Simulating transaction...");
        // build call data to be sent to the simulateTransaction function
        const callData = buildCallData(
          formData.functionParams,
          formData.functionParamsValues
        );

        const transactionTrace = await simulateTransaction(
          address as string,
          formData.contractAddress,
          formData.selectedFunction,
          callData
        );

        if (transactionTrace.error) {
          toast({
            title: "Transaction Simulation Failed",
            // description: transactionTrace.errorMessage,
            variant: "destructive",
          });
          setLoading(false);
        } else {
          console.log("Transaction Result : ", transactionTrace);
          setInternalCalls(transactionTrace.internal_calls);

          toast({
            title: "Simulation Successful",
            description: "You can now view the simulation results",
          });
          setLoading(false);
          setStep(step + 1);
        }

        // case 1: no params -- just pass 0x0
        // case 2: no integer type params -- no need to pass 0x0 at the end
        // case 3: integer type params -- pass 0x0 at the end i.e. increment the length of the params array by 1
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStartNewSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // setStep(3); // TESTING
    setSimulationStarted(false);
  };

  const handleSaveSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "Simulation saved",
      description: "You can view your saved simulations in the dashboard",
      variant: "default",
    });
    setSimulationStarted(false);
  };

  return (
    <div
      className={`flex flex-col gap-8 mt-8 my-8${step === 4 ? "" : "px-64"}`}
    >
      {loading ? (
        <div className="flex flex-col gap-4 items-center font-bold opacity-80 justify-center mt-20 ">
          <Spinner />
          <p>{loadingMessage}</p>
        </div>
      ) : (
        <div>
          <div className="">
            {step === 1 ? (
              <Step1 formData={formData} setFormData={setFormData} />
            ) : step === 2 ? (
              <div className="flex flex-col gap-4">
                <Step2
                  formData={formData}
                  setFormData={setFormData}
                  contractFunctions={contractFunctions}
                />
              </div>
            ) : step === 3 ? (
              <div className="flex flex-col gap-4">
                <Step3
                  formData={formData}
                  setFormData={setFormData}
                  contractFunctions={contractFunctions}
                />
              </div>
            ) : step === 4 ? (
              <div className="flex flex-col gap-4">
                <Step4
                  internalCalls={internalCalls}
                  setformData={setFormData}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p>other case </p>
              </div>
            )}
          </div>
          <div className=" mt-4">
            {step === 1 ? (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSimulationStarted(false)}
                  className="rounded-[10px] text-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="rounded-[10px] text-md"
                >
                  Next
                </Button>
              </div>
            ) : step === 2 ? (
              <div className="flex justify-between">
                <Button
                  variant={"outline"}
                  onClick={handlePreviousStep}
                  className="rounded-[10px] text-md"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="rounded-[10px] text-md"
                >
                  Next
                </Button>
              </div>
            ) : step === 3 ? (
              <div className="flex justify-between">
                <Button
                  variant={"outline"}
                  onClick={handlePreviousStep}
                  className="rounded-[10px] text-md"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="rounded-[10px] text-md bg-blue-500 hover:bg-blue-400"
                >
                  Simulate Transaction
                </Button>
              </div>
            ) : step === 4 ? (
              <div className="flex gap-8 justify-center ">
                <Button
                  onClick={handleStartNewSimulation}
                  className="rounded-[10px] text-md "
                  variant={"outline"}
                >
                  Start New Simulation
                </Button>

                <Button
                  onClick={handleSaveSimulation}
                  className="rounded-[10px] text-md bg-green-500 hover:bg-green-400"
                >
                  Save Simulation
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p>other case </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSimulationForm;
