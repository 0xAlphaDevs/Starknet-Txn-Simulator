import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const TransactionTrace = ({ internalCalls }: any) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Transaction Trace</CardTitle>
        <CardDescription>
          Below are the details of your current simulated transaction
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {internalCalls.map((call: any, index: number) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="shadow-sm rounded-[10px] bg-slate-200 py-2 px-4">
              {/* contractAddress */}
              <div className="flex flex-col gap-1 justify-between">
                <p className="font-medium">Contract Address :</p>
                <p className="text-sm font-bold">{call.contractAddress}</p>
              </div>
              <Separator className="my-4 bg-slate-600" />
              {/* call and function */}
              <div className="flex gap-12 my-4">
                <p className="font-medium">
                  Call Type :<Badge className="ml-2"> {call.callType}</Badge>
                </p>
                <p className="font-medium">
                  Function Name :
                  <Badge className="ml-2">{call.functionName}</Badge>
                </p>
              </div>

              {/* Display Inputs */}
              <div className="flex flex-col gap-2 ml-8 my-4 ">
                <p className="font-semibold text-lg">Inputs:</p>

                {call.inputs.length > 0 ? (
                  call.inputs.map((input: any, inputIndex: number) => (
                    <div
                      key={inputIndex}
                      className="shadow-sm rounded-[10px] bg-slate-100 py-2 px-4 mb-2"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                          <div className="flex flex-col gap-1">
                            <p className="italic font-medium">Name:</p>
                            <p className="text-red-500">{input.name}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="italic font-medium">Type:</p>
                            <p className="text-yellow-500">{input.type}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="italic font-medium">Value:</p>
                          <p className="text-green-600">{input.value[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div> No input parameters for this function </div>
                )}
              </div>

              <div className="flex flex-col gap-2 ml-8 my-4">
                <p className="font-semibold text-lg">Outputs:</p>

                {call.outputs.length > 0 ? (
                  call.outputs.map((output: any, outputIndex: number) => (
                    <div
                      key={outputIndex}
                      className="shadow-sm rounded-[10px] bg-slate-100 py-2 px-4 mb-2"
                    >
                      <div className="flex gap-12">
                        <div className="flex flex-col gap-1">
                          <p className="italic font-medium">Type:</p>
                          <p className="text-yellow-500">{output.type}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="italic font-medium">Value:</p>
                          <p className="text-green-600">{output.value[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div> No output available for this function call. </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionTrace;
