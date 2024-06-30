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
import { Button } from "../ui/button";
import Spinner from "../spinner";
import { callAiAgent } from "@/lib/callAiAgent";

const TransactionSummary = ({ internalCalls }: any) => {
  const [summary, setSummary] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateSummary = async () => {
    console.log("Generate Summary for txn ", internalCalls);
    setLoading(true);
    // Call AI agent to generate summary
    await callAiAgent(JSON.stringify(internalCalls)).then(
      (response: string) => {
        const aiResponse = JSON.parse(response);

        if (!response) {
          setSummary("Summary could not be generated. Please try again.");
          setLoading(false);
          return;
        }
        setSummary(aiResponse.summary);
        setLoading(false);
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Transaction Summary</CardTitle>
        <CardDescription>
          You can generate a summary for this transaction simultion using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">{<Spinner />}</div>
        ) : (
          <div className="flex justify-center py-4">
            {summary ? (
              <div>
                <p className="text-lg bg-gray-200 p-4 rounded-[10px] shadow-sm">
                  {summary}
                </p>
              </div>
            ) : (
              <Button onClick={handleGenerateSummary}>
                Generate AI Summary
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionSummary;
