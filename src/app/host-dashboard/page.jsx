'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  List,
  LogOut,
  Menu,
  PlusCircle,
  User,
  LayoutGrid,
  DollarSign,
  Banknote,
  Hourglass,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';


function SidebarNav({ isMobile = false }) {
    const router = useRouter();
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.replace('/');
        });
    };

    const navLinks = [
        { href: '/host-dashboard', icon: LayoutGrid, label: 'Dashboard' },
        { href: '#', icon: List, label: 'My Listings' },
        { href: '#', icon: PlusCircle, label: 'Add Homestay' },
        { href: '#', icon: Bell, label: 'Booking Requests', badge: '5' },
        { href: '#', icon: DollarSign, label: 'Earnings' },
        { href: '#', icon: User, label: 'Profile' },
    ];
    
    // Using a static pathname for active link styling
    const pathname = '/host-dashboard';

    return (
        <div className="flex flex-col h-full">
            <nav className={cn("grid items-start gap-1 px-2", isMobile ? "text-lg font-medium" : "text-sm font-medium")}>
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === link.href && "bg-muted text-primary"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                        {link.badge && (
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                {link.badge}
                            </Badge>
                        )}
                    </Link>
                ))}
            </nav>
            <div className={cn("mt-auto", isMobile ? 'p-4' : 'p-4')}>
                 <Button variant="ghost" className="w-full justify-start gap-3 rounded-lg px-3 py-2" onClick={handleSignOut}>
                    <LogOut className={cn("h-4 w-4", { "h-5 w-5": isMobile })} />
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default function HostDashboardPage() {
    const router = useRouter();
    const { user, isUserLoading } = useUser();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.replace('/');
        });
    };

    if (isUserLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!user) {
        router.replace('/login');
        return (
             <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold"><span className="text-primary">Tour</span>Mate Host</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <SidebarNav />
          </div>
        </div>
      </aside>
      <div className="flex flex-col bg-muted/20">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                      <Home className="h-6 w-6 text-primary" />
                      <span className="text-xl font-bold"><span className="text-primary">Tour</span>Mate Host</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <SidebarNav isMobile={true} />
                </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
           <Button onClick={handleSignOut} variant="secondary" size="sm">
                Logout
            </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Host 👋</h1>
            <p className="text-muted-foreground">
              Manage your homestays and booking requests.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                <List className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Active homestays
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Booking Requests</CardTitle>
                <Hourglass className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+5</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting your approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <Banknote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹50,000</div>
                <p className="text-xs text-muted-foreground">
                  +12.4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
           <div className="flex-1 rounded-lg bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Activity (Coming Soon)</h3>
                <div className="flex items-center justify-center h-full min-h-48 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Recent bookings and messages will appear here.</p>
                </div>
            </div>

        </main>
        <footer className="border-t bg-card">
            <div className="container mx-auto text-center py-6 text-muted-foreground text-sm">
                 <p>Quick Links | For Hosts | Contact @ {new Date().getFullYear()} TourMate | All Rights Reserved.</p>
            </div>
        </footer>
      </div>
    </div>
  );
}
