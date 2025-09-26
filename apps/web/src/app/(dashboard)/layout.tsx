import { APIDashboardLayout } from '@zchemacraft/layouts/api-dashboard/layout';
import { AuthProtected } from '@zchemacraft/providers/auth-protected';
import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mock APIs - Zchema Craft',
  description:
    'Manage your mock APIs. Create, view, and delete mock APIs to streamline your development process with Zchema Craft.',
};

export default function MockAPILayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtected>
      <APIDashboardLayout>{children}</APIDashboardLayout>
    </AuthProtected>
  );
}
