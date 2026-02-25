'use client';

import Link from 'next/link';
import { MapPin, LogOut, Menu, Users, Home, Compass, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useMemo } from 'react';
import { doc, collection } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const navLinks = [
  { href: '/admin-dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '#', label: 'Manage Users', icon: Users },
  { href: '#', label: 'Manage Homestays', icon: Home },
  { href: '#', label: 'Manage Guides', icon: Compass },
  { href: '#', label: 'Reports', icon: BarChart2 },
];

function SidebarNav({ isMobile = false }) {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div className="flex h-full flex-col bg-card text-foreground rounded-r-2xl shadow-2xl">
      <div className="flex h-20 items-center border-b px-6 shrink-0">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <MapPin className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">TourMate</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4 mt-4">
        {navLinks.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary",
              {'bg-primary/10 text-primary font-semibold': link.href.includes('admin-dashboard')}
            )}
          >
            {link.href.includes('admin-dashboard') && <span className="absolute left-0 h-8 w-1.5 bg-primary rounded-r-full"></span>}
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 mb-4">
        <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, breakdown, isLoading }) {
  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-muted-foreground"><Skeleton className="h-6 w-3/4" /></CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl text-center font-semibold text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-5xl font-bold">{value}</p>
        <div className="mt-4 text-base text-muted-foreground space-y-1">
          {breakdown.map(item => <p key={item}>{item}</p>)}
        </div>
      </CardContent>
    </Card>
  );
}


export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);
  
  const allUsersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'users') : null, [firestore]);
  const { data: allUsers, isLoading: isAllUsersLoading } = useCollection(allUsersQuery);

  const allHomestaysQuery = useMemoFirebase(() => firestore ? collection(firestore, 'homestays') : null, [firestore]);
  const { data: allHomestays, isLoading: isAllHomestaysLoading } = useCollection(allHomestaysQuery);
  
  const stats = useMemo(() => {
    if (!allUsers || !allHomestays) {
      return {
        totalUsers: { value: 0, breakdown: [] },
        homestayListings: { value: 0, breakdown: [] },
        localGuides: { value: 0, breakdown: [] },
      };
    }

    const tourists = allUsers.filter(u => u.role === 'Tourist').length;
    const hosts = allUsers.filter(u => u.role === 'home stay host').length;
    const guides = allUsers.filter(u => u.role === 'tour guide').length;

    return {
      totalUsers: {
        value: allUsers.length,
        breakdown: [`${tourists} Tourists`, `${hosts} Hosts`, `${guides} Guides`],
      },
      homestayListings: {
        value: allHomestays.length,
        breakdown: ["5 Pending Approval"], // Placeholder
      },
      localGuides: {
        value: guides,
        breakdown: ["2 Pending Verification"], // Placeholder
      },
    };
  }, [allUsers, allHomestays]);
  
  // Using placeholder for bookings as it requires complex aggregation
  const totalBookings = {
    title: "Total Bookings",
    value: "96",
    breakdown: ["12 Active", "84 Completed"],
  };


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

  const dashboardIsLoading = isUserLoading || isProfileLoading || isAllUsersLoading || isAllHomestaysLoading;

  if (dashboardIsLoading || !userProfile || userProfile.role !== 'admin') {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-muted/30">
      <aside className="hidden lg:block">
        <SidebarNav />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-16 items-center justify-between gap-4 px-6 lg:justify-end">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
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
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
             <StatCard title="Total Users" value={stats.totalUsers.value} breakdown={stats.totalUsers.breakdown} isLoading={dashboardIsLoading} />
             <StatCard title="Homestay Listings" value={stats.homestayListings.value} breakdown={stats.homestayListings.breakdown} isLoading={dashboardIsLoading} />
             <StatCard title="Local Guides" value={stats.localGuides.value} breakdown={stats.localGuides.breakdown} isLoading={dashboardIsLoading} />
             <StatCard title={totalBookings.title} value={totalBookings.value} breakdown={totalBookings.breakdown} isLoading={dashboardIsLoading} />
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
