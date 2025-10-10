'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { appointments as initialAppointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  useEffect(() => {
    setIsClient(true);
    const isLoggedIn = sessionStorage.getItem('sofia-nails-admin') === 'true';
    setIsAuthenticated(isLoggedIn);
    if (!isLoggedIn) {
      router.replace('/admin');
    }
  }, [router]);
  
  // This effect will re-sync state if server data changes and page is reloaded/refreshed
  useEffect(() => {
    setAppointments(initialAppointments);
  }, []);

  if (!isClient || !isAuthenticated) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
           <Skeleton className="h-9 w-1/3" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">
          Scheduled Appointments
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={appointments} />
        </CardContent>
      </Card>
    </div>
  );
}
