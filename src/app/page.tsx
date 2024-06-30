import WalletBar from "@/components/WalletBar";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <Image src="/logo.svg" width={150} height={150} alt="Logo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Starknet Txn Simulator !
        </h1>
        <p className="text-muted-foreground">
          AI-Enhanced transaction simulator with user-Friendly insights for
          Starknet blockchain | Built using Galadriel
        </p>
      </div>
      <WalletBar />

      <div className="grid grid-cols-3 gap-8 px-20 py-8 ">
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center ">EASY TO USE AI</CardTitle>
            <CardDescription className="text-center pt-1">
              Users only need to enter contract addresses. ABIs and function
              names are aueried and populated autimatically.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center ">
              CLEAR & CONCISE SIMULATION
            </CardTitle>
            <CardDescription className="text-center pt-1">
              Clear and easy to understand transaction traces data displayed in
              the web application.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center">
              AI POWERED TXN SUMMARY
            </CardTitle>
            <CardDescription className="text-center pt-1">
              Decentralized & On chain AI inference using Galadriel L1 to
              generate txn summary.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="fixed container mx-auto bottom-4">
        <hr className="border-t-1 border-slate-600 mb-4" />
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground">
            &copy;{" "}
            <a href="https://www.alphadevs.dev/" target="_blank">
              alphadevs.dev
            </a>{" "}
            | All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
