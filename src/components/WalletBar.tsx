"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo } from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

function WalletConnected() {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  useEffect(() => {
    console.log("Connected to wallet:", address);
    router.push("/dashboard");
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      <button
        onClick={() => {
          disconnect();
          router.push("/");
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      <span>Choose a wallet: </span>
      {connectors.map((connector) => {
        return (
          <Button
            key={connector.id}
            onClick={() => connect({ connector })}
            className="gap-x-2 mr-2"
          >
            {connector.id}
          </Button>
        );
      })}
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
