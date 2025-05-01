
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from '@/lib/utils';
import { Transaction } from '@/types/budget';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <a href="#" className="text-sm text-primary hover:underline">View All</a>
      </CardHeader>
      <CardContent className="px-0">
        {transactions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No transactions yet. Add your first expense!
          </div>
        ) : (
          <div className="space-y-1">
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between px-6 py-2 hover:bg-muted/50">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${getCategoryColor(transaction.category)}`}>
                    <span className="text-white text-sm">{transaction.category.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <span className={transaction.type === 'expense' ? 'text-budget-red' : 'text-budget-green'}>
                  {transaction.type === 'expense' ? '-' : '+'}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Food': 'bg-budget-green',
    'Transportation': 'bg-budget-blue',
    'Entertainment': 'bg-budget-purple',
    'Shopping': 'bg-budget-yellow',
    'Bills': 'bg-budget-red',
    'Health': 'bg-budget-dark-purple',
  };
  
  return colorMap[category] || 'bg-budget-gray';
};

export default RecentTransactions;
