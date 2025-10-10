'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { NailPolish } from './icons';

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <NailPolish className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">Sofia Nails</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#book-now"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Book
          </Link>
          <Link
            href="/admin"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/admin')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
