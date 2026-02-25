'use client';

import Link from 'next/link';
import {
  MapPin,
  LayoutDashboard,
  Users,
  BedDouble,
  UserCheck,
  BarChart,
  LogOut,
  Menu,
} from 'lucide-react';
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
  { href: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'Manage Users' },
  { href: '#', icon: BedDouble, label: 'Manage Homestays' },
  { href: '#', icon: UserCheck, label: 'Manage Guides' },
  { href: '#', icon: BarChart, label: 'Reports' },
];

function SidebarNav({ isMobile = false }) {
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">TourMate</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navLinks.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary data-[active=true]:text-primary data-[active=true]:bg-primary/10"
            data-active={link.href.includes('admin-dashboard')}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start gap-3 px-3">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

const statsCards = [
    {
        title: "Total Users",
        value: "152",
        breakdown: ["120 Tourists", "20 Hosts", "12 Guides"],
        icon: Users
    },
    {
        title: "Homestay Listings",
        value: "48",
        breakdown: ["5 Pending Approval"],
        icon: BedDouble
    },
    {
        title: "Local Guides",
        value: "12",
        breakdown: ["2 Pending Verification"],
        icon: UserCheck
    },
    {
        title: "Total Bookings",
        value: "96",
        breakdown: ["12 Active", "84 Completed"],
        icon: BarChart
    }
]

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
      <aside className="hidden border-r bg-card lg:block">
        <SidebarNav />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SidebarNav isMobile={true} />
            </SheetContent>
          </Sheet>
          <div className="flex-1" />
           <Button variant="secondary" onClick={handleSignOut}>Logout</Button>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
            <p className="text-muted-foreground">
              Monitor platform activity and manage users.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
             {statsCards.map(card => (
                 <Card key={card.title}>
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-muted-foreground">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{card.value}</p>
                        <div className="mt-2 text-sm text-muted-foreground space-y-1">
                            {card.breakdown.map(item => <p key={item}>{item}</p>)}
                        </div>
                    </CardContent>
                </Card>
             ))}
          </div>
        </main>
        <footer className="bg-foreground text-background/80 py-6 px-6 mt-auto">
            <div className="container mx-auto flex justify-between items-center text-sm">
                <div>
                  TourMate | Quick Links | For Users | Contact @ {new Date().getFullYear()} TourMate | All Rights Reserved.
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
