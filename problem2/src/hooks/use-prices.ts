import { useCallback, useEffect, useState } from "react";
import type { Currency } from "@/types";
import axios from "axios";

export const usePrices = () => {
  const [prices, setPrices] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );
      const normalized = Object.values(
        (response.data as Currency[]).reduce((acc, token) => {
          if (!acc[token.currency]) acc[token.currency] = { ...token };
          else
            acc[token.currency].price =
              (acc[token.currency].price + token.price) / 2;
          return acc;
        }, {} as Record<string, Currency>)
      );
      setPrices(normalized);
    } catch (error) {
      setError("Failed to fetch prices");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setPrices, setError, setIsError, setIsLoading]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return [prices, { isLoading, isError, error }] as const;
};
