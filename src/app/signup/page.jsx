'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
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
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-sm space-y-6">
                <div className="text-center">
                    <Link href="/" className="inline-block mb-4">
                        <Globe className="h-12 w-12 mx-auto text-primary" />
                    </Link>
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your information to get started
                    </p>
                </div>
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
            </div>
        </div>
        <div className="hidden bg-muted lg:block relative">
            <Image
                src="https://images.unsplash.com/photo-1605206754383-024a2f8d5e97?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Beautiful Indian temple"
                fill
                className="object-cover"
                data-ai-hint="India temple"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white p-8">
                <blockquote className="space-y-2">
                    <p className="text-2xl font-semibold">&ldquo;To travel is to discover that everyone is wrong about other countries.&rdquo;</p>
                    <footer className="text-lg">- Aldous Huxley</footer>
                </blockquote>
            </div>
      </div>
    </div>
  );
}
