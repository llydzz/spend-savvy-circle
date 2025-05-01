
import React from 'react';

interface BudgetProgressRingProps {
  percentage: number;
  isOverBudget?: boolean;
}

const BudgetProgressRing: React.FC<BudgetProgressRingProps> = ({ percentage, isOverBudget = false }) => {
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2} className="budget-progress-ring">
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={isOverBudget ? '#FF5252' : percentage > 80 ? '#FFC107' : '#9b87f5'}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-2xl font-bold">{Math.min(percentage, 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default BudgetProgressRing;
