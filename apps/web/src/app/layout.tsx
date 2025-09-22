import { BaseLayout } from '@zchemacraft/layouts/base-layout';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { BuyMeACoffee } from '../components/buy-me-a-coffee';
import { QueryProvider } from '../providers/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zchema Craft - Craft your schemas into mock data.',
  description:
    'Generate realistic mock data from Mongoose, Prisma, or Drizzle schemas effortlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <QueryProvider>
          <BaseLayout>
            {children}
            <BuyMeACoffee />
            <Toaster position="bottom-right" richColors closeButton />
          </BaseLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
