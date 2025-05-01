
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BudgetDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (amount: number, period: 'weekly' | 'monthly') => void;
  currentBudget: number;
  currentPeriod: 'weekly' | 'monthly';
}

const BudgetDialog: React.FC<BudgetDialogProps> = ({ 
  open, onClose, onSave, currentBudget, currentPeriod
}) => {
  const [budgetAmount, setBudgetAmount] = useState<string>(currentBudget.toString());
  const [period, setPeriod] = useState<'weekly' | 'monthly'>(currentPeriod);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount <= 0) return;
    onSave(amount, period);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Set Budget</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                min="0"
                step="0.01"
                required
                placeholder="Enter budget amount"
              />
            </div>
            <div className="grid gap-2">
              <Label>Budget Period</Label>
              <RadioGroup value={period} onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="period-weekly" />
                  <Label htmlFor="period-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="period-monthly" />
                  <Label htmlFor="period-monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
