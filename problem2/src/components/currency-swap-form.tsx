import { PriceCombobox } from "@/components/price-combobox";
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
import type { Currency } from "@/types";
import { AlertCircle, Banknote } from "lucide-react";
import { useCallback, useState } from "react";

interface Props {
  prices: Currency[];
}

const getExchangeRate = (
  from: string,
  to: string,
  prices: Currency[]
): number => {
  const fromPrice = prices.find((p) => p.currency === from)?.price;
  const toPrice = prices.find((p) => p.currency === to)?.price;
  if (!fromPrice || !toPrice) throw new Error("Token not found");
  return fromPrice / toPrice;
};

const convertAmount = (
  amount: number,
  from: string,
  to: string,
  prices: Currency[]
): number => {
  const rate = getExchangeRate(from, to, prices);
  return amount * rate;
};

export const CurrencySwapForm = ({ prices }: Props) => {
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<number | "">("");
  const [toAmount, setToAmount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      setError(null);
      const result = convertAmount(
        Number(fromAmount),
        fromCurrency,
        toCurrency,
        prices
      );
      setToAmount(result);
    } else {
      setError("Please select currencies and fill in all fields");
    }
  }, [fromAmount, fromCurrency, toCurrency, prices]);

  return (
    <Card className="w-full border-t-3 border-t-indigo-400">
      <CardHeader>
        <CardTitle className="w-full flex items-center gap-2">
          <Banknote className="text-indigo-400" />
          Currency Swap
        </CardTitle>
        {error && (
          <CardDescription className="text-red-600 flex items-center gap-2">
            <AlertCircle className="size-5" />
            {error}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cols-span-1 w-full space-y-2">
            <div className="w-full flex items-center gap-2">
              <Label>From currency:</Label>
              <PriceCombobox
                value={fromCurrency}
                setValue={setFromCurrency}
                prices={prices}
              />
            </div>
            <Input
              value={fromAmount}
              onChange={(e) => setFromAmount(Number(e.target.value) || "")}
              type="number"
              placeholder="Input amount..."
            />
          </div>
          <div className="cols-span-1 w-full space-y-2">
            <div className="w-full flex items-center gap-2">
              <Label>To currency:</Label>
              <PriceCombobox
                value={toCurrency}
                setValue={setToCurrency}
                prices={prices}
              />
            </div>
            <Input
              value={toAmount.toFixed(6)}
              onChange={(e) => setToAmount(Number(e.target.value) || 0)}
              type="number"
              readOnly
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button className="w-full" variant="outline" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};
