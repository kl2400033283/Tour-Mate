'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
            <header className="p-4 border-b bg-background">
                <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">
                    TourMate
                    </span>
                </Link>
                <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
                <Card className="max-w-md w-full text-center shadow-lg">
                    <CardHeader>
                        <div className="mx-auto bg-destructive/10 rounded-full p-3 w-fit">
                            <ShieldAlert className="h-10 w-10 text-destructive"/>
                        </div>
                        <CardTitle className="text-2xl pt-4">Access Denied</CardTitle>
                        <CardDescription>You must be logged in to view your profile.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground">Please return to the homepage to log in.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              TourMate
            </span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="text-xs break-all">{user.uid}</p>
                </div>
                <Button onClick={handleSignOut} className="w-full">
                Sign Out
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
