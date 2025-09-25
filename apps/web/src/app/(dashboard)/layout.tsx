import { APIDashboardLayout } from '@zchemacraft/layouts/api-dashboard/layout';
import { AuthProtected } from '@zchemacraft/providers/auth-protected';
import React from 'react';

export default function MockAPILayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtected>
      <APIDashboardLayout>{children}</APIDashboardLayout>
    </AuthProtected>
  );
}
