'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
