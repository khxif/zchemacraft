import { AdminDashboardLayout } from '@zchemacraft/layouts/admin-layout/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
