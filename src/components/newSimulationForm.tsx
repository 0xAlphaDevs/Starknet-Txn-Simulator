import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Step1 from "./simulationStepper/step1";
import Step2 from "./simulationStepper/step2";
import Step3 from "./simulationStepper/step3";
import Step4 from "./simulationStepper/step4";


const NewSimulationForm = ({ setSimulationStarted }: any) => {

  const [selectedFunction, setSelectedFunction] = React.useState<any>(null);
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    contractAddress: "",
    network: "mainnet",
    abi: "",
    selectedFunction: "",
    functionParams: {},
  });


  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSimulationStarted(false)
  };

  return (
    <div className={`flex flex-col gap-8 mt-8 ${step === 4 ? "px-24" : "px-64"}`}>
      <div className="">
        {step === 1 ? (
          <Step1 formData={formData} setFormData={setFormData} />
        ) : step === 2 ? (
          <div className="flex flex-col gap-4">
            <Step2 formData={formData} setFormData={setFormData} />
          </div>
        ) : step === 3 ? (
          <div className="flex flex-col gap-4">
            <Step3 formData={formData} setFormData={setFormData} />
          </div>
        ) : step === 4 ? (
          <div className="flex flex-col gap-4">
            <Step4 formData={formData} setformData={setFormData} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p>other case </p>
          </div>
        )
        }
      </div>
      <div className="">
        {step === 1 ? (
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setSimulationStarted(false)} className="rounded-[10px] text-md">
              Cancel
            </Button>
            <Button onClick={handleNextStep} className="rounded-[10px] text-md">Next</Button>
          </div>
        ) : step === 2 ? (
          <div className="flex justify-between">
            <Button onClick={handlePreviousStep} className="rounded-[10px] text-md">
              Previous
            </Button>
            <Button onClick={handleNextStep} className="rounded-[10px] text-md">Next</Button>
          </div>
        ) : step === 3 ? (
          <div className="flex justify-between">
            <Button onClick={handlePreviousStep} className="rounded-[10px] text-md">
              Previous
            </Button>
            <Button onClick={handleNextStep} className="rounded-[10px] text-md bg-blue-500 hover:bg-blue-400">Simulate Transaction</Button>
          </div>
        ) : step === 4 ? (
          <div className="flex justify-center">
            <Button onClick={handleSubmit} className="rounded-[10px] text-md bg-green-500 hover:bg-green-400">Save Simulation</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p>other case </p>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default NewSimulationForm;
