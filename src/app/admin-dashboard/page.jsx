'use client';

import Link from 'next/link';
import { MapPin, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase/index.jsx';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin-dashboard', label: 'Dashboard' },
  { href: '#', label: 'Manage Users' },
  { href: '#', label: 'Manage Homestays' },
  { href: '#', label: 'Manage Guides' },
  { href: '#', label: 'Reports' },
];

function SidebarNav({ isMobile = false }) {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div className="flex h-full flex-col bg-card text-foreground">
      <div className="flex h-16 items-center border-b px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">TourMate</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-6 p-4 mt-6">
        {navLinks.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className="relative flex items-center px-3 py-2 text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
            data-active={link.href.includes('admin-dashboard')}
          >
            {link.href.includes('admin-dashboard') && <span className="absolute left-[-0.5rem] h-6 w-1 bg-primary rounded-full"></span>}
            <span className={cn('ml-2', {'text-primary font-semibold': link.href.includes('admin-dashboard')})}>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 mb-4">
        <button onClick={handleSignOut} className="flex items-center px-3 py-2 text-lg font-medium text-foreground/70 transition-colors hover:text-foreground w-full text-left">
          Logout
        </button>
      </div>
    </div>
  );
}

const statsCards = [
    {
        title: "Total Users",
        value: "152",
        breakdown: ["120 Tourists", "20 Hosts", "12 Guides"],
    },
    {
        title: "Homestay Listings",
        value: "48",
        breakdown: ["5 Pending Approval"],
    },
    {
        title: "Local Guides",
        value: "12",
        breakdown: ["2 Pending Verification"],
    },
    {
        title: "Total Bookings",
        value: "96",
        breakdown: ["12 Active", "84 Completed"],
    }
];

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  useEffect(() => {
    const isLoading = isUserLoading || isProfileLoading;
    if (isLoading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (userProfile) {
      if (userProfile.role !== 'admin') {
        switch (userProfile.role) {
          case 'home stay host':
            router.replace('/host-dashboard');
            break;
          case 'tour guide':
            router.replace('/tour-guide-dashboard');
            break;
          case 'Tourist':
            router.replace('/profile');
            break;
          default:
            router.replace('/');
            break;
        }
      }
    }
  }, [user, isUserLoading, userProfile, isProfileLoading, router]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    });
  };

  const isLoading = isUserLoading || isProfileLoading;
  if (isLoading || !userProfile || userProfile.role !== 'admin') {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r lg:block">
        <SidebarNav />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-16 items-center justify-end gap-4 px-6">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="lg">
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0 w-[280px]">
                <SidebarNav isMobile={true} />
              </SheetContent>
            </Sheet>
          </div>
           <Button variant="secondary" size="lg" onClick={handleSignOut} className="hidden lg:flex">Logout</Button>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold">Welcome, Admin 👋</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitor platform activity and manage users.
            </p>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
             {statsCards.slice(0, 3).map(card => (
                 <Card key={card.title} className="shadow-lg rounded-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-muted-foreground">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold">{card.value}</p>
                        <div className="mt-4 text-base text-muted-foreground space-y-1">
                            {card.breakdown.map(item => <p key={item}>{item}</p>)}
                        </div>
                    </CardContent>
                </Card>
             ))}
          </div>
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-start-2">
                 <Card key={statsCards[3].title} className="shadow-lg rounded-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-muted-foreground">{statsCards[3].title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold">{statsCards[3].value}</p>
                        <div className="mt-4 text-base text-muted-foreground space-y-1">
                            {statsCards[3].breakdown.map(item => <p key={item}>{item}</p>)}
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
        <footer className="bg-foreground text-background/80 py-6 px-6 mt-auto">
            <div className="container mx-auto flex justify-center items-center text-sm">
                <div>
                  TourMate | Quick Links | For Users | Contact @ {new Date().getFullYear()} TourMate | All Rights Reserved.
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
