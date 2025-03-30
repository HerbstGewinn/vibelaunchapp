
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  className?: string;
}

const StatCard = ({ title, value, change, className }: StatCardProps) => {
  return (
    <div className={cn("bg-launch-card-bg rounded-lg p-6", className)}>
      <h3 className="text-gray-400 font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">{value}</div>
        {typeof change !== 'undefined' && (
          <div className={cn(
            "flex items-center text-sm",
            change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-gray-400"
          )}>
            {change > 0 ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : change < 0 ? (
              <ArrowDown className="h-4 w-4 mr-1" />
            ) : null}
            {change > 0 ? `+${change}` : change}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
