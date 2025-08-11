"use client";

import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Currency } from "@/lib/types";

const currencies: Currency[] = ["USD", "EUR", "OMR", "AED", "SAR"];

export function CurrencySelector() {
  const { state, setCurrency } = useAppContext();
  const currentCurrency = state.settings.currency;

  return (
    <div className="space-y-2">
        <Label>Currency</Label>
        <Select onValueChange={(value: Currency) => setCurrency(value)} defaultValue={currentCurrency}>
            <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
            </SelectTrigger>
            <SelectContent>
                {currencies.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
}
