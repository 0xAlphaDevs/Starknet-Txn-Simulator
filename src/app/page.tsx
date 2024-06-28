
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
      <Image
        src='/logo.svg'
        width={150}
        height={150}
        alt='Logo'
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Stark Simulator AI!
        </h1>
        <p className="text-muted-foreground">AI-Enhanced Transaction Simulator with User-Friendly Insights on Starknet | Built using Galadriel</p>
      </div>
      <WalletBar />

      <div className="grid grid-cols-3 gap-8 px-20 py-8 ">
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center ">Feature</CardTitle>
            <CardDescription className="text-center pt-1">
              AI-Enhanced Transaction Simulator with User-Friendly Insights on Starknet
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center ">Feature</CardTitle>
            <CardDescription className="text-center pt-1">
              AI-Enhanced Transaction Simulator with User-Friendly Insights on Starknet
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full bg-slate-300 rounded-lg bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center">Feature</CardTitle>
            <CardDescription className="text-center pt-1">
              AI-Enhanced Transaction Simulator with User-Friendly Insights on Starknet
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="fixed container mx-auto bottom-4">
        <hr className="border-t-1 border-slate-600 mb-4" />
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground">&copy; <a href="https://www.alphadevs.dev/" target="_blank">alphadevs.dev</a> | All rights reserved.</p>
        </div>
      </div>

    </main>
  );
}
