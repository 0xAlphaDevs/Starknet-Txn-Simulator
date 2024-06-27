
import WalletBar from "@/components/WalletBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <h1 className="text-4xl font-bold text-primary">
        Welcome to Starknet Txn. Simulator!
      </h1>
      <p>Powered by AI | Built using Galadriel</p>
      <h2 className="text-2xl font-semibold text-primary">
        Start by connecting your wallet.
      </h2>
      <WalletBar />
    </main>
  );
}
