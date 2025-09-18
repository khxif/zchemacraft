import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { QueryProvider } from '../providers/query-provider';
import './globals.css';
import { BuyMeACoffee } from '../components/buy-me-a-coffee';

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
          {children}
          <BuyMeACoffee />
          <Toaster position="bottom-right" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
