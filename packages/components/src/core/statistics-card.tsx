import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@zchemacraft/components/ui/card';

interface StatisticsCardProps {
  title: string;
  value: string;
}

export function StatisticsCard({ title, value }: StatisticsCardProps) {
  return (
    <Card>
      <CardContent className="max-w-sm w-full flex flex-col gap-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <h4 className='font-medium text-base'>{value}</h4>
      </CardContent>
    </Card>
  );
}
