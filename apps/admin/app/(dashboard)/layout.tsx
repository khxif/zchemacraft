import { AdminDashboardLayout } from '@zchemacraft/layouts/admin-layout/layout';
import { AdminProtected } from '@zchemacraft/providers/admin-protected';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtected>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </AdminProtected>
  );
}
