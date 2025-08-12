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

export function SetGoalDialog() {
  const { state, setEmergencyFundTarget } = useAppContext();
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState(state.emergencyFund.target.toString());

  const handleSubmit = () => {
    const newGoal = parseFloat(goal);
    if (!isNaN(newGoal) && newGoal >= 0) {
      setEmergencyFundTarget(newGoal);
      setOpen(false);
    } else {
      alert("Please enter a valid positive number for the goal.");
    }
  };

  // Update local state if global state changes
  useState(() => {
    setGoal(state.emergencyFund.target.toString());
  }, [state.emergencyFund.target]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Set Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Emergency Fund Goal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal Amount
            </Label>
            <Input
              id="goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Set Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
