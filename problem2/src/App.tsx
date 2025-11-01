import { usePrices } from "@/hooks/use-prices";
import "./App.css";

import { AlertTriangle } from "lucide-react";
import { CurrencySwapForm } from "@/components/currency-swap-form";

function App() {
  const [prices, { isLoading, isError, error }] = usePrices();

  if (isLoading)
    return (
      <div className="w-screen h-screen bg-white">
        <div className="w-2xl max-w-[90vw] mx-auto p-4"></div>
      </div>
    );

  if (isError)
    return (
      <div className="w-screen h-screen bg-white">
        <div className="w-2xl max-w-[90vw] mx-auto p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="size-6" />
            <p className="">Error: {error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen h-screen bg-white">
      <div className="w-3xl max-w-[90vw] mx-auto p-4">
        <CurrencySwapForm prices={prices} />
      </div>
    </div>
  );
}

export default App;
