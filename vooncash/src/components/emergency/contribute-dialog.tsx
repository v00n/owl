"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const quickAddAmounts = [10, 25, 50, 100];

export function ContributeDialog() {
  const { contributeToEmergencyFund } = useAppContext();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const contributionAmount = parseFloat(amount);
    if (!isNaN(contributionAmount) && contributionAmount > 0) {
      contributeToEmergencyFund(contributionAmount);
      setOpen(false);
      setAmount("");
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  const handleQuickAdd = (addAmount: number) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + addAmount).toString());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Contribute</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contribute to Emergency Fund</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {quickAddAmounts.map((addAmount) => (
              <Button
                key={addAmount}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(addAmount)}
              >
                + {addAmount}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Contribute</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
