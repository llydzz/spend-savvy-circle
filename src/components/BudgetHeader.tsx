
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface BudgetHeaderProps {
  onNewTransaction: () => void;
  onSetBudget: () => void;
}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ onNewTransaction, onSetBudget }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { name } = JSON.parse(userData);
      setUserName(name);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };
  
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Budget Buddy</h1>
        <p className="text-muted-foreground">
          {userName ? `Welcome, ${userName}! Track, manage and optimize your spending` : 'Track, manage and optimize your spending'}
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={onSetBudget} variant="outline">Set Budget</Button>
        <Button onClick={onNewTransaction}>New Transaction</Button>
        <Button onClick={handleLogout} variant="outline" className="ml-2">Logout</Button>
      </div>
    </header>
  );
};

export default BudgetHeader;
