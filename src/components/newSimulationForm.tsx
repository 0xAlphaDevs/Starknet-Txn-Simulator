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
    setSimulationStarted(false);
  };

  return (
    <div className="flex flex-col gap-8 items-center mt-12">
      <Card className={step === 4 ? "w-[80%]" : "w-[40%]"}>
        <CardHeader>
          <CardTitle>Simulation Details</CardTitle>
          {/* <CardDescription>
            Enter details below to get started with a simulation.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="h-72">

          {step === 1 ? (
            // Initial step - enter contract address and ABI
            <Step1 formData={formData} setFormData={setFormData} />
          ) : step === 2 ? (
            // Select function to call
            <div className="flex flex-col gap-4">
              <Step2 formData={formData} setFormData={setFormData} />
            </div>
          ) : step === 3 ? (
            // display the function name from step2 in the header of step 3 and make field to enter parameters
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
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => setSimulationStarted(false)}>
                Cancel
              </Button>
              <Button onClick={handleNextStep}>Next</Button>
            </>
          ) : step === 4 ? (
            <>
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button onClick={handleNextStep}>Next</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewSimulationForm;
