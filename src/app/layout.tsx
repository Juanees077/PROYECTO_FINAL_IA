import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/main-nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Sofia Nails',
  description: 'Book your next nail appointment with Sofia Nails.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <MainNav />
        <main className="flex-grow">{children}</main>
        <footer className="bg-card text-card-foreground p-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sofia Nails. All Rights Reserved.</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
