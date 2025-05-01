
import React, { useState, useEffect } from 'react';
import BudgetHeader from '@/components/BudgetHeader';
import BudgetSummary from '@/components/BudgetSummary';
import CategorySummary from '@/components/CategorySummary';
import RecentTransactions from '@/components/RecentTransactions';
import BudgetDialog from '@/components/BudgetDialog';
import TransactionDialog from '@/components/TransactionDialog';
import { BudgetState, Transaction, Category } from '@/types/budget';
import { calculateTotalSpent, calculateSpentByCategory, generateId, saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const DEFAULT_STATE: BudgetState = {
  totalBudget: 1000,
  spentAmount: 0,
  period: 'monthly',
  transactions: [
    {
      id: '1',
      amount: 45.99,
      description: 'Groceries',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      amount: 120.00,
      description: 'Electric bill',
      category: 'Bills',
      type: 'expense',
      date: new Date().toISOString(),
    },
    {
      id: '3',
      amount: 1500.00,
      description: 'Salary',
      category: 'Income',
      type: 'income',
      date: new Date().toISOString(),
    }
  ],
  categories: [
    { id: '1', name: 'Food', budget: 300, spent: 45.99 },
    { id: '2', name: 'Bills', budget: 400, spent: 120 },
    { id: '3', name: 'Transportation', budget: 200, spent: 0 },
    { id: '4', name: 'Entertainment', budget: 100, spent: 0 },
  ]
};

const Index = () => {
  const [budgetState, setBudgetState] = useState<BudgetState>(DEFAULT_STATE);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const savedState = loadFromLocalStorage<BudgetState>('budgetState', DEFAULT_STATE);
    setBudgetState(savedState);
  }, []);
  
  // Calculate spent amount whenever transactions change
  useEffect(() => {
    const spent = calculateTotalSpent(budgetState.transactions);
    const spentByCategory = calculateSpentByCategory(budgetState.transactions);
    
    // Update categories with spent amounts
    const updatedCategories = budgetState.categories.map(category => ({
      ...category,
      spent: spentByCategory[category.name] || 0
    }));
    
    setBudgetState(prevState => ({
      ...prevState,
      spentAmount: spent,
      categories: updatedCategories
    }));
  }, [budgetState.transactions]);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage('budgetState', budgetState);
  }, [budgetState]);
  
  const handleSetBudget = (amount: number, period: 'weekly' | 'monthly') => {
    setBudgetState(prevState => ({
      ...prevState,
      totalBudget: amount,
      period
    }));
    
    toast({
      title: "Budget Updated",
      description: `Your ${period} budget has been set to $${amount}.`,
    });
  };
  
  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      date: new Date().toISOString()
    };
    
    setBudgetState(prevState => ({
      ...prevState,
      transactions: [newTransaction, ...prevState.transactions]
    }));
    
    toast({
      title: "Transaction Added",
      description: `${transactionData.description} has been added to your transactions.`,
    });
  };
  
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <BudgetHeader 
        onNewTransaction={() => setIsTransactionDialogOpen(true)} 
        onSetBudget={() => setIsBudgetDialogOpen(true)} 
      />
      
      <BudgetSummary 
        totalBudget={budgetState.totalBudget}
        spentAmount={budgetState.spentAmount}
        period={budgetState.period}
      />
      
      <Tabs defaultValue="summary" className="mb-8">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RecentTransactions transactions={budgetState.transactions} />
            <CategorySummary categories={budgetState.categories} />
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="mt-6">
          <RecentTransactions transactions={budgetState.transactions} />
        </TabsContent>
        <TabsContent value="categories" className="mt-6">
          <CategorySummary categories={budgetState.categories} />
        </TabsContent>
      </Tabs>
      
      <BudgetDialog 
        open={isBudgetDialogOpen}
        onClose={() => setIsBudgetDialogOpen(false)}
        onSave={handleSetBudget}
        currentBudget={budgetState.totalBudget}
        currentPeriod={budgetState.period}
      />
      
      <TransactionDialog
        open={isTransactionDialogOpen}
        onClose={() => setIsTransactionDialogOpen(false)}
        onSave={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
