import { BaseLayout } from '@zchemacraft/layouts/base-layout';
import { QueryProvider } from '@zchemacraft/providers/query-provider';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { keywords } from '../lib/keywords';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zchema Craft - Craft your schemas into mock data.',
  description:
    'Zchema Craft helps developers instantly convert schemas (Mongoose, Prisma, Drizzle) into realistic mock data. Easily seed your database, generate mock APIs, and accelerate development with schema-driven testing tools.',
  openGraph: {
    title: 'Zchema Craft - Craft your schemas into mock data.',
    description:
      'Zchema Craft helps developers instantly convert schemas (Mongoose, Prisma, Drizzle) into realistic mock data. Easily seed your database, generate mock APIs, and accelerate development with schema-driven testing tools.',
    url: 'https://zchemacraft.com',
    siteName: 'Zchema Craft',
    images: [
      {
        url: '/logo2.png',
        width: 1200,
        height: 630,
        alt: 'Website Preview',
      },
    ],
    type: 'website',
  },
  keywords: keywords,
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
          data-message="Enjoying the app? Consider supporting me!"
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
