
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetProgressRing from './BudgetProgressRing';
import { formatCurrency } from '@/lib/utils';

interface BudgetSummaryProps {
  totalBudget: number;
  spentAmount: number;
  period: 'weekly' | 'monthly';
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ totalBudget, spentAmount, period }) => {
  const percentSpent = totalBudget > 0 ? (spentAmount / totalBudget) * 100 : 0;
  const remainingAmount = totalBudget - spentAmount;
  const isOverBudget = remainingAmount < 0;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {period === 'weekly' ? 'Weekly' : 'Monthly'} Budget Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center sm:flex-row sm:justify-around">
        <div className="flex flex-col items-center mb-6 sm:mb-0">
          <BudgetProgressRing percentage={Math.min(percentSpent, 100)} isOverBudget={isOverBudget} />
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {isOverBudget ? 'Over budget by' : 'Remaining'}
            </p>
            <p className={`text-2xl font-bold ${isOverBudget ? 'text-budget-red' : 'text-budget-green'}`}>
              {formatCurrency(Math.abs(remainingAmount))}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-2xl font-bold">{formatCurrency(spentAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Spent %</p>
            <p className="text-2xl font-bold">{percentSpent.toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Days Left</p>
            <p className="text-2xl font-bold">{getRemainingDays(period)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to calculate days remaining in current period
function getRemainingDays(period: 'weekly' | 'monthly'): number {
  const today = new Date();
  
  if (period === 'weekly') {
    // 0 is Sunday, 6 is Saturday
    const daysUntilEndOfWeek = 6 - today.getDay();
    return daysUntilEndOfWeek + 1; // Include today
  } else {
    // Monthly
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return lastDayOfMonth - today.getDate() + 1; // Include today
  }
}

export default BudgetSummary;
