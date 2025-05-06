
import React from 'react';
import { Button } from "@/components/ui/button";

interface BudgetHeaderProps {
  onNewTransaction: () => void;
  onSetBudget: () => void;
}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ onNewTransaction, onSetBudget }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Budget Buddy</h1>
        <p className="text-muted-foreground">Track, manage and optimize your spending</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={onSetBudget} variant="outline">Set Budget</Button>
        <Button onClick={onNewTransaction}>New Transaction</Button>
      </div>
    </header>
  );
};

export default BudgetHeader;
