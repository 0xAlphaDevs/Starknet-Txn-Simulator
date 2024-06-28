"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { WalletButton } from "./ui/WalletButton";
import { useRouter } from "next/navigation";
import { CopyCheckIcon, CopyIcon } from "lucide-react";


function WalletConnected() {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);


  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  useEffect(() => {
    console.log("Connected to wallet:", address);
    router.push("/dashboard");
  }, [address]);

  const copyToClipboard = () => {
    if (address) {  // Ensure address is defined
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      });
    } else {
      console.error("Address is undefined.");
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <p className="font-normal text-sm">Address:</p>
        <p className="font-light text-sm flex items-center">
          {shortenedAddress}
          <button onClick={copyToClipboard} className="ml-2">
            {copied ? <CopyCheckIcon className="h-4 w-4 font-light text-green-500" /> : <CopyIcon className="h-4 w-4 font-light" />}
          </button>
        </p>
      </div>
      <div>
        <WalletButton
          onClick={() => {
            disconnect();
            router.push("/");
          }}
          className="gap-x-2 mr-2 bg-red-500 w-full"
        >
          Disconnect
        </WalletButton>
      </div>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      {connectors.map((connector) => {
        return (
          <WalletButton
            key={connector.id}
            onClick={() => connect({ connector })}
            className="mr-2 px-2 bg-blue-600 font-bold text-2xl rounded-[15px]"
          >
            {/* {connector.id} */}
            <p className="px-2"> Connect Wallet</p>
          </WalletButton>
        );
      })}
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
