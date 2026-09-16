import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isNegativeChange?: boolean;
  icon: LucideIcon;
  color?: 'cyan' | 'red' | 'amber' | 'emerald' | 'purple' | 'blue';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isNegativeChange,
  icon: Icon,
  color = 'blue',
  onClick
}) => {
  const colorStyles = {
    blue: 'border-l-4 border-l-brand-600 text-brand-600 bg-brand-50/50 dark:bg-brand-950/20',
    red: 'border-l-4 border-l-risk-critical text-risk-critical bg-risk-criticalBg/60 dark:bg-red-950/20',
    amber: 'border-l-4 border-l-risk-moderate text-risk-moderate bg-risk-moderateBg/60 dark:bg-amber-950/20',
    emerald: 'border-l-4 border-l-risk-low text-risk-low bg-risk-lowBg/60 dark:bg-emerald-950/20',
    cyan: 'border-l-4 border-l-teal-600 text-teal-600 bg-teal-50/50 dark:bg-teal-950/20',
    purple: 'border-l-4 border-l-purple-600 text-purple-600 bg-purple-50/50 dark:bg-purple-950/20'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-4 shadow-gov transition-all hover:shadow-gov-md ${
        onClick ? 'cursor-pointer hover:border-gov-300 dark:hover:border-slate-700' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-gov-500 dark:text-slate-400 tracking-tight">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${colorStyles[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-extrabold font-mono text-gov-900 dark:text-white tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-semibold font-mono ${
              isNegativeChange
                ? 'text-risk-critical dark:text-red-400'
                : 'text-risk-low dark:text-emerald-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-gov-500 dark:text-slate-400 font-medium truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
