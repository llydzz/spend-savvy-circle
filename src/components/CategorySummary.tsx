
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/lib/utils';
import { Category } from '@/types/budget';

interface CategorySummaryProps {
  categories: Category[];
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ categories }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Categories</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {categories.map(category => {
            const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={category.id} className="px-6 py-2 hover:bg-muted/50">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span className={isOverBudget ? 'text-budget-red' : ''}>
                    {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isOverBudget ? 'bg-budget-red' : 'bg-budget-purple'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
