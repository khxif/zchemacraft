import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@zchemacraft/components/ui/card';
import { Users, UsersIcon } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string;
}

export function StatisticsCard({ title, value }: StatisticsCardProps) {
  return (
    <Card>
      <CardContent className="max-w-sm w-full flex gap-5 items-center">
        <UsersIcon className="h-6 w-6 text-primary" />

        <div className='flex flex-col space-y-2'>
          <CardTitle className="text-xl">{title}</CardTitle>
          <h4 className="font-medium text-base">{value}</h4>
        </div>
      </CardContent>
    </Card>
  );
}
