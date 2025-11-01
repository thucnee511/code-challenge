import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Currency } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  prices: Currency[];
}

export const PriceCombobox = ({ value, setValue, prices }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white flex-1"
        >
          {value && (
            <div className="size-4 rounded-full overflow-hidden">
              <Image
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
                  prices.find((price) => price.currency === value)?.currency
                }.svg`}
                alt={
                  prices.find((price) => price.currency === value)?.currency ||
                  ""
                }
              />
            </div>
          )}
          {value
            ? prices.find((price) => price.currency === value)?.currency
            : "Select currency..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {prices.map((price) => (
                <CommandItem
                  key={price.currency}
                  value={price.currency}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="size-4 rounded-full overflow-hidden">
                    <Image
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${price.currency}.svg`}
                      alt={price.currency}
                    />
                  </div>
                  {price.currency}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === price.currency ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
