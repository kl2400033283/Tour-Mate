'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/firebase';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});


export default function SignupPage() {
  const auth = useAuth();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    },
  });

  const onSubmit = (data) => {
    if (auth) {
        initiateEmailSignUp(auth, data.email, data.password);
        // Potentially update profile with first/last name after signup
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
        <Button asChild variant="ghost" size="icon" className="absolute top-4 left-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Home</span>
            </Link>
        </Button>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <Globe className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="mt-4 text-2xl font-bold">Join TourMate</CardTitle>
            <CardDescription>Create an account to start your journey.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="first-name">First name</Label>
                        <FormControl>
                            <Input id="first-name" placeholder="Max" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="last-name">Last name</Label>
                        <FormControl>
                            <Input id="last-name" placeholder="Robinson" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                        <Input id="email" type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                        <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}