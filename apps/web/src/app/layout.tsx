import { BaseLayout } from '@zchemacraft/layouts/base-layout';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
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
      <head>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="Khaif"
          data-description="Support me on Buy me a coffee!"
          data-message="Enjoying the app? Consider supporting my work!"
          data-color="#BD5FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          defer
        ></script>
      </head>
      <body>
        <QueryProvider>
          <BaseLayout>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </BaseLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
