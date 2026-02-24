'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const auth = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    if (auth) {
      initiateEmailSignIn(auth, data.email, data.password);
    }
  };

  const imageUrl = "https://images.unsplash.com/photo-1617540156434-635237894d35?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="relative min-h-screen w-full">
       <Image
        src={imageUrl}
        alt="Hawa Mahal in Jaipur"
        fill
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        data-ai-hint="Hawa Mahal Jaipur"
        priority
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="mx-auto max-w-sm w-full bg-white/10 backdrop-blur-md text-primary-foreground border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <Link href="/" className="inline-block">
                <Globe className="h-12 w-12 mx-auto text-white" />
            </Link>
            <div>
              <CardTitle className="text-2xl font-bold">Login to TourMate</CardTitle>
              <CardDescription className="text-white/80">
                Enter your credentials to access your account
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email" className="text-white/90">Email</Label>
                      <FormControl>
                        <Input id="email" type="email" placeholder="m@example.com" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary" />
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
                       <div className="flex items-center">
                          <Label htmlFor="password" className="text-white/90">Password</Label>
                          <Link href="#" className="ml-auto inline-block text-sm underline text-white/80 hover:text-white">
                              Forgot your password?
                          </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Login
                </Button>
                <Button variant="outline" className="w-full bg-transparent hover:bg-white/20 text-white border-white/50 hover:border-white">
                  Login with Google
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-center text-sm text-white/80">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline text-white hover:font-bold">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
