
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
}

export interface BudgetState {
  totalBudget: number;
  spentAmount: number;
  period: 'weekly' | 'monthly';
  transactions: Transaction[];
  categories: Category[];
}
