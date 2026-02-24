'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images.js';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { RoleSelectionDialog } from '@/components/RoleSelectionDialog';

const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
});


export default function SignupPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [isRoleDialogOpen, setRoleDialogOpen] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    },
  });

  const onSubmit = (data) => {
    if (auth) {
        setIsSubmitting(true);
        setSignupData(data);
        initiateEmailSignUp(auth, data.email, data.password);
    }
  };

  useEffect(() => {
    if (isSubmitting && user && !isUserLoading) {
        setRoleDialogOpen(true);
        setIsSubmitting(false);
    }
  }, [user, isUserLoading, isSubmitting]);

  const backgroundImage = PlaceHolderImages.find(p => p.id === 'background-image');
  const imageUrl = backgroundImage?.imageUrl || 'https://picsum.photos/seed/bg/1920/1080';
  const imageHint = backgroundImage?.imageHint || 'India travel';
  const imageAlt = backgroundImage?.description || "A collage of famous landmarks in India.";

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        data-ai-hint={imageHint}
        priority
        suppressHydrationWarning
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="mx-auto max-w-sm w-full bg-white/10 backdrop-blur-md text-primary-foreground border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
                <Link href="/" className="inline-block">
                    <MapPin className="h-12 w-12 mx-auto text-white" />
                </Link>
                <div>
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription className="text-white/80">
                        Enter your information to get started
                    </CardDescription>
                </div>
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
                            <Label htmlFor="first-name" className="text-white/90">First name</Label>
                            <FormControl>
                                <Input id="first-name" type="text" placeholder="Max" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary"/>
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
                            <Label htmlFor="last-name" className="text-white/90">Last name</Label>
                            <FormControl>
                                <Input id="last-name" type="text" placeholder="Robinson" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary" />
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
                    name="phoneNumber"
                    render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="phone-number" className="text-white/90">Phone Number</Label>
                        <FormControl>
                            <Input id="phone-number" type="tel" placeholder="123-456-7890" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary" />
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
                        <Label htmlFor="password" className="text-white/90">Password</Label>
                        <FormControl>
                            <Input id="password" type="password" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-offset-primary" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting} suppressHydrationWarning>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Creating Account..." : "Create an account"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent hover:bg-white/20 text-white border-white/50 hover:border-white" suppressHydrationWarning>
                Sign up with Google
                </Button>
            </form>
            </Form>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="text-center text-sm text-white/80">
                Already have an account? Please return to the homepage to log in.
              </div>
            </CardFooter>
        </Card>
      </div>
      <RoleSelectionDialog 
        open={isRoleDialogOpen} 
        onOpenChange={setRoleDialogOpen}
        signupData={signupData}
      />
    </div>
  );
}
