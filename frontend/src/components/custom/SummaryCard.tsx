import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ISummaryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string | number;
}

export const SummaryCard: React.FC<ISummaryCardProps & { className?: string }> = ({
  title,
  description,
  icon,
  value,
  className,
}) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-200 opacity-90" />
      <div className="relative z-10 h-full rounded-2xl bg-white/20 p-5 backdrop-blur-md">
        <CardHeader className="mb-4 p-0">
          <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
          <CardDescription className="text-sm text-white/80">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 p-0">
          <div className="text-4xl text-white">{icon}</div>
          <span className="text-3xl font-bold text-white">{value}</span>
        </CardContent>
      </div>
    </Card>
  );
};

export default SummaryCard;
