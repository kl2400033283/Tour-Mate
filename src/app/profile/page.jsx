'use client';

import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Loader2, ShieldAlert, MapPin, LogOut, LayoutGrid, Bed, UserCheck, Menu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
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
        { href: '/profile', icon: LayoutGrid, label: 'Dashboard' },
        { href: '#', icon: Bed, label: 'My Stays' },
        { href: '#', icon: UserCheck, label: 'My Guide Bookings' },
    ];

    const pathname = '/profile';

    return (
        <>
            <nav className={cn("flex flex-col gap-2", isMobile ? "text-lg" : "text-sm font-medium")}>
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === link.href && "text-primary bg-muted"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className={cn("mt-auto flex flex-col gap-2", isMobile ? 'pt-6' : 'p-4')}>
                 <Button variant="ghost" className="w-full justify-start gap-3 rounded-lg px-3 py-2" onClick={handleSignOut}>
                    <LogOut className={cn("h-4 w-4", { "h-5 w-5": isMobile })} />
                    Logout
                </Button>
            </div>
        </>
    );
}


export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const userProfileRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

    const homestayBookingsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'users', user.uid, 'homestayBookings'), orderBy('bookingDate', 'desc'));
    }, [user, firestore]);
    const { data: homestayBookings, isLoading: homestayLoading } = useCollection(homestayBookingsQuery);
    const latestHomestayBooking = homestayBookings?.[0];

    const guideBookingsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'users', user.uid, 'guideBookings'), orderBy('bookingDate', 'desc'));
    }, [user, firestore]);
    const { data: guideBookings, isLoading: guideLoading } = useCollection(guideBookingsQuery);
    const latestGuideBooking = guideBookings?.[0];

    const totalTrips = (homestayBookings?.length || 0) + (guideBookings?.length || 0);
    const isCardsLoading = homestayLoading || guideLoading;

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.replace('/');
        });
    };

    if (isUserLoading || isProfileLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                                <ShieldAlert className="h-10 w-10 text-destructive" />
                            </div>
                            <CardTitle className="text-2xl pt-4">Access Denied</CardTitle>
                            <CardDescription>You must be logged in to view your dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Please return to the homepage to log in.</p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        );
    }

    const displayName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : (user?.email?.split('@')[0] || 'User');

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <aside className="hidden border-r bg-card md:block">
                <div className="flex h-full max-h-screen flex-col">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <MapPin className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold"><span className="text-primary">Tour</span>Mate</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-4">
                        <div className="relative px-4">
                            <SidebarNav />
                        </div>
                    </div>
                </div>
            </aside>
            <div className="flex flex-col bg-background">
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
                                     <MapPin className="h-6 w-6 text-primary" />
                                     <span className="text-xl font-bold"><span className="text-primary">Tour</span>Mate</span>
                                </Link>
                            </div>
                            <div className="flex-1 overflow-auto py-4">
                                <div className="relative px-4">
                                     <SidebarNav isMobile={true}/>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                    <div className="w-full flex-1" />
                    <Button onClick={handleSignOut} variant="secondary">
                        Logout
                    </Button>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight">Welcome, {displayName}</h1>
                        <p className="text-muted-foreground">
                            Here&apos;s a summary of your bookings and activities.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Upcoming Stay
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isCardsLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ) : latestHomestayBooking ? (
                                    <>
                                        <div className="text-lg font-bold">{latestHomestayBooking.homestayName}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {latestHomestayBooking.checkInDate} – {latestHomestayBooking.checkOutDate}
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-lg font-bold">No bookings yet.</div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Guide Tour
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                               {isCardsLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ) : latestGuideBooking ? (
                                    <>
                                        <div className="text-lg font-bold">{latestGuideBooking.guideName}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {latestGuideBooking.tourDate}
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-lg font-bold">No bookings yet.</div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isCardsLoading ? (
                                    <Skeleton className="h-6 w-1/2" />
                                ) : (
                                    <div className="text-lg font-bold">{totalTrips} Booking{totalTrips !== 1 ? 's' : ''}</div>
                                )}
                                <p className='text-xs text-muted-foreground invisible'>-</p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
