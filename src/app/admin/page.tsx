'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NailPolish } from '@/components/icons';

const ADMIN_PASSWORD = 'password123'; // In a real app, this would be handled securely on the backend.

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      if (values.password === ADMIN_PASSWORD) {
        sessionStorage.setItem('sofia-nails-admin', 'true');
        toast({
          title: 'Login Successful',
          description: 'Redirecting to dashboard...',
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Incorrect password. Please try again.',
          variant: 'destructive',
        });
        form.reset();
      }
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <NailPolish className="h-12 w-12 text-primary"/>
          </div>
          <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter the password to manage appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
