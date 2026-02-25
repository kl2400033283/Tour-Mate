'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import { Loader2, MapPin, Search, Star, Menu, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { citiesByState } from '@/lib/tourist-cities';
import { notFound } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { generateListingsAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { saveGuideBooking } from '@/lib/bookings';
import { cn } from '@/lib/utils';

const getCityData = (slug) => {
  if (!slug) return null;
  for (const state in citiesByState) {
    const city = citiesByState[state].find(c => c.slug === slug);
    if (city) return city;
  }
  return null;
};

function GuideCard({ guide, user, city, date }) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const firestore = useFirestore();

  const cameFromHomestayPage = searchParams.get('from') === 'homestay';

  const saveBooking = () => {
    if (!firestore || !user) return;
    const bookingDetails = {
      guideId: guide.id,
      guideName: guide.name,
      city: city.name,
      tourDate: date.from,
    };
    saveGuideBooking(firestore, user.uid, bookingDetails);
  };

  const handleHire = () => {
    if (user) {
      if (!date.from) {
        toast({
          variant: 'destructive',
          title: 'Missing Date',
          description: 'Please enter a tour date.',
        });
        return;
      }
      if (cameFromHomestayPage) {
        saveBooking();
        toast({
          variant: 'success',
          title: 'Booking Complete!',
          description: 'Your homestay and local guide are booked successfully.',
          duration: 10000,
        });
        router.push('/profile');
      } else {
        setIsDialogOpen(true);
      }
    } else {
      const redirectPath = cameFromHomestayPage ? `${pathname}?from=homestay` : pathname;
      router.push(`/login?redirect=${redirectPath}`);
    }
  };

  const handleDialogYes = () => {
    router.push(`/book-homestay/${params.city}?from=guide`);
  };

  const handleDialogNo = () => {
    saveBooking();
    toast({
      variant: 'success',
      title: "Guide Hired!",
      description: "Your local guide is booked successfully.",
      duration: 10000,
    });
    router.push('/profile');
  };

  return (
    <>
      <Card className="overflow-hidden bg-card shadow-lg transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <div className="relative w-full h-48">
           <Image
              src={`https://picsum.photos/seed/${guide.imageHint?.replace(/\s/g, '-') || guide.id}/300/400`}
              alt={guide.name}
              fill
              className="object-cover"
              data-ai-hint={guide.imageHint}
            />
        </div>
        <CardHeader className="p-4 text-center">
            <CardTitle className="text-xl font-bold">{guide.name}</CardTitle>
            <p className="text-sm text-primary font-semibold">{guide.specialty}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow text-center space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                    <p className="font-bold text-lg text-foreground">{guide.rating.toFixed(1)}</p>
                    <p>Rating</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg text-foreground">{guide.experience}</p>
                    <p>Years Exp.</p>
                </div>
            </div>
            <div>
                <p className="font-semibold text-foreground">Languages</p>
                <p>{guide.languages.join(', ')}</p>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col gap-2">
            <p className="text-xl font-bold">₹{guide.rate.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
            <Button className="w-full" onClick={handleHire}>Hire</Button>
        </CardFooter>
      </Card>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Would you like to book a homestay?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogNo}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleDialogYes}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


function CardSkeleton() {
    return (
        <Card className="flex flex-col text-center p-6 space-y-4">
            <Skeleton className="h-24 w-24 mx-auto rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="flex justify-center items-center gap-4">
                <div className="text-center w-1/2">
                    <Skeleton className="h-6 w-1/2 mx-auto mb-1" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
                <div className="text-center w-1/2">
                    <Skeleton className="h-6 w-1/2 mx-auto mb-1" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/3 mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    )
}

export default function HireLocalGuidePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const citySlug = params.city;
  const city = useMemo(() => getCityData(citySlug), [citySlug]);
  
  const [guides, setGuides] = useState([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationError, setGenerationError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [rating, setRating] = useState('all');
  const [date, setDate] = useState({ from: '', to: '' });

  useEffect(() => {
    if (!citySlug) return;
    
    const fetchGuides = async () => {
      setIsGenerating(true);
      setGenerationError(null);
      try {
        const listings = await generateListingsAction({ city: city?.name || citySlug, listingType: 'guides' });
        setGuides(listings || []);
      } catch (e) {
        const error = e instanceof Error ? e.message : 'Failed to generate guides.';
        setGenerationError(error);
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
    };

    fetchGuides();
  }, [citySlug, city?.name]);

  const specialties = useMemo(() => {
    const allSpecialties = guides.map(guide => guide.specialty);
    return ['all', ...new Set(allSpecialties)];
  }, [guides]);

  const filteredGuides = useMemo(() => {
    return guides
      .filter(guide => guide.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(guide => specialty === 'all' || guide.specialty === specialty)
      .filter(guide => rating === 'all' || guide.rating >= parseFloat(rating));
  }, [guides, searchQuery, specialty, rating]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!city) {
      notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 text-gray-800">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              TourMate
            </span>
          </Link>
          <nav className="hidden items-center gap-2 sm:flex">
             <Button asChild variant="outline">
                <Link href={`/explore/${citySlug}`}>Back</Link>
            </Button>
            {user ? (
                <Button asChild>
                  <Link href="/profile">Dashboard</Link>
                </Button>
            ) : (
                 <Button asChild>
                  <Link href={`/login?redirect=${pathname}`}>Login</Link>
                </Button>
            )}
          </nav>
          <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 pt-8">
                     <Link href="/" className="flex items-center gap-2 mb-4">
                      <MapPin className="h-6 w-6 text-primary" />
                      <span className="text-xl font-bold tracking-tight">TourMate</span>
                    </Link>
                    <Link href={`/explore/${citySlug}`} className="text-lg">Back to City</Link>
                    {user ? (
                        <Link href="/profile" className="text-lg">Dashboard</Link>
                    ): (
                        <Link href={`/login?redirect=${pathname}`} className="text-lg">Login</Link>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-2">Local Guides in {city.name}</h1>
          <p className="text-lg text-muted-foreground">Find expert guides to enhance your travel experience</p>
        </div>

        <div className="mb-8 p-4 bg-background rounded-lg shadow-md max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search guides..." 
                className="pl-10" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="From (DD/MM/YYYY)"
                className="pl-10"
                value={date.from}
                onChange={e => setDate(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>

            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="To (DD/MM/YYYY)"
                className="pl-10"
                value={date.to}
                onChange={e => setDate(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(s => (
                  <SelectItem key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4">4 Stars & above</SelectItem>
                <SelectItem value="4.5">4.5 Stars & above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isGenerating ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        ) : generationError ? (
            <div className="text-center py-16 bg-background rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-destructive">Failed to Load Guides</h2>
                <p className="text-muted-foreground mt-2">{generationError}</p>
                <p className="text-muted-foreground mt-1">Please try again later.</p>
            </div>
        ) : filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGuides.map(guide => (
              <GuideCard key={guide.id} guide={guide} user={user} city={city} date={date} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-background rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">No Guides Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 bg-background">
        <div className="container mx-auto text-center py-6 text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} TourMate. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
