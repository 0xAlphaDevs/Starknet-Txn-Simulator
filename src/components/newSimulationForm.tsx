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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewSimulationForm = ({ setSimulationStarted }: any) => {
  const [formData, setFormData] = React.useState<any>({});
  const [selectedFunction, setSelectedFunction] = React.useState<any>(null);
  const [step, setStep] = React.useState(1);

  return (
    <div className="flex flex-col gap-8 items-center mt-24">
      <Card className="w-[40%]">
        <CardHeader>
          <CardTitle>New Simulation</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            // Initial step - enter contract address and ABI
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          ) : step === 2 ? (
            // Select function to call
            <div className="flex flex-col gap-4">
              <p>Select function to call...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p>other case </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setSimulationStarted(false)}>
            Cancel
          </Button>
          <Button onClick={() => setStep(2)}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewSimulationForm;
