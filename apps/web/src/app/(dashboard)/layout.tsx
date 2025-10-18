import { APIDashboardLayout } from '@zchemacraft/layouts/api-dashboard/layout';
import { AuthProtected } from '@zchemacraft/providers/auth-protected';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata ={
  title: 'Mock APIs',
  description: 'Generate Mock APIs with just your ORMs(mongoose, prisma, more coming soon..) schema'
}

export default function MockAPILayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtected>
      <APIDashboardLayout>{children}</APIDashboardLayout>
    </AuthProtected>
  );
}
