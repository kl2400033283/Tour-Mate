'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import { Loader2, MapPin, Search, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { citiesByState } from '@/lib/tourist-cities.js';
import { notFound } from 'next/navigation';
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

const getCityData = (slug) => {
  if (!slug) return null;
  for (const state in citiesByState) {
    const city = citiesByState[state].find(c => c.slug === slug);
    if (city) return city;
  }
  return null;
};

function HomestayCard({ homestay, user }) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cameFromGuidePage = searchParams.get('from') === 'guide';

  const handleConfirm = () => {
    if (user) {
      if (cameFromGuidePage) {
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
      const redirectPath = cameFromGuidePage ? `${pathname}?from=guide` : pathname;
      router.push(`/login?redirect=${redirectPath}`);
    }
  };

  const handleDialogYes = () => {
    router.push(`/hire-local-guide/${params.city}?from=homestay`);
  };

  const handleDialogNo = () => {
    toast({
      variant: "success",
      title: "Booking Confirmed!",
      description: "Your homestay is booked successfully.",
      duration: 10000,
    });
    router.push('/profile');
  };

  return (
    <>
      <Card className="overflow-hidden bg-card shadow-md rounded-xl flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={`https://picsum.photos/seed/${homestay.imageHint?.replace(/\s/g, '-') || homestay.id}/400/300`}
            alt={homestay.name}
            fill
            className="object-cover"
            data-ai-hint={homestay.imageHint}
          />
        </div>
        <div className="p-4 space-y-3 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-bold">{homestay.name}</h3>
            <p className="text-sm text-muted-foreground">{homestay.location}</p>
          </div>
          <div className="space-y-2">
              <p className="text-base font-semibold">{homestay.price.toLocaleString()}/Night</p>
              <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-bold text-foreground">{homestay.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-muted-foreground h-10">{homestay.description}</p>
          </div>
          <Button className="w-full mt-2" onClick={handleConfirm}>Confirm</Button>
        </div>
      </Card>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Would you like to hire a tour guide?</AlertDialogTitle>
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
        <Card className="overflow-hidden bg-card shadow-md rounded-xl">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/5" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    )
}

export default function BookHomestayPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const citySlug = params.city;
  const city = useMemo(() => getCityData(citySlug), [citySlug]);
  
  const [homestays, setHomestays] = useState([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationError, setGenerationError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [rating, setRating] = useState('all');

  useEffect(() => {
    if (!citySlug) return;
    
    const fetchHomestays = async () => {
      setIsGenerating(true);
      setGenerationError(null);
      try {
        const listings = await generateListingsAction({ city: city?.name || citySlug, listingType: 'homestays' });
        setHomestays(listings || []);
      } catch (e) {
        const error = e instanceof Error ? e.message : 'Failed to generate homestays.';
        setGenerationError(error);
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
    };

    fetchHomestays();
  }, [citySlug, city?.name]);

  const filteredHomestays = useMemo(() => {
    return homestays
      .filter(homestay => homestay.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(homestay => {
          if (priceRange === 'all') return true;
          const [min, max] = priceRange.split('-').map(Number);
          if(max) return homestay.price >= min && homestay.price <= max;
          return homestay.price >= min;
      })
      .filter(homestay => rating === 'all' || homestay.rating >= parseFloat(rating));
  }, [homestays, searchQuery, priceRange, rating]);

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              TourMate
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="secondary" className="rounded-lg px-6 hidden sm:flex">
                <Link href={`/explore/${citySlug}`}>Back</Link>
            </Button>
            {user ? (
                 <Button asChild variant="secondary" className="rounded-lg px-6 hidden sm:flex">
                    <Link href="/profile">Dashboard</Link>
                 </Button>
            ) : (
                <Button asChild variant="secondary" className="rounded-lg px-6 hidden sm:flex">
                  <Link href={`/login?redirect=${pathname}`}>Login</Link>
                </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-2">Homestays in {city.name}</h1>
          <p className="text-lg text-muted-foreground">Find comfortable and verified stays near top attractions</p>
        </div>

        <div className="mb-8 p-3 bg-card rounded-xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search homestays..." 
                className="pl-10 bg-background focus:bg-card border-none h-11" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-background focus:bg-card border-none h-11">
                    <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-2000">₹0 - ₹2,000</SelectItem>
                  <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                  <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                  <SelectItem value="10000-Infinity">₹10,000+</SelectItem>
                </SelectContent>
            </Select>
            <Select value={rating} onValueChange={setRating}>
                <SelectTrigger className="bg-background focus:bg-card border-none h-11">
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
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        ) : generationError ? (
            <div className="text-center py-16 bg-card rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-destructive">Failed to Load Homestays</h2>
                <p className="text-muted-foreground mt-2">{generationError}</p>
                <p className="text-muted-foreground mt-1">Please try again later.</p>
            </div>
        ) : filteredHomestays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomestays.map(homestay => (
              <HomestayCard key={homestay.id} homestay={homestay} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">No Homestays Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </main>

      <footer className="w-full bg-foreground text-background/80 mt-16">
        <div className="container mx-auto text-center py-6 text-sm">
            <p>TourMate | Quick Links | For Users | Contact @ {new Date().getFullYear()} TourMate | All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
