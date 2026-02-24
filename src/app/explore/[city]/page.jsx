'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowLeft, Menu, BedDouble, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { citiesByState } from '@/lib/tourist-cities';
import { Skeleton } from '@/components/ui/skeleton';

function HomestayCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-6 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

function HomestayCard({ homestay }) {
  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <Image
        src={homestay.imageUrl || 'https://picsum.photos/seed/homestay/400/300'}
        alt={homestay.name}
        width={400}
        height={250}
        className="h-48 w-full object-cover"
        data-ai-hint="homestay interior"
      />
      <CardHeader>
        <CardTitle className="font-bold text-xl">{homestay.name}</CardTitle>
        <CardDescription className="flex items-center pt-1">
          <MapPin className="h-4 w-4 mr-1.5" />
          {homestay.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex justify-between text-muted-foreground text-sm">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1.5" />
            <span>{homestay.numberOfBedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1.5 text-yellow-500 fill-current" />
            <span>4.5 (120 reviews)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-end">
        <div className="text-lg font-bold">
          ₹{homestay.pricePerNight}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            / night
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CityPage({ params }) {
  const citySlug = params.city;
  const firestore = useFirestore();

  const cityDetails = useMemo(() => {
    for (const stateSlug in citiesByState) {
      const foundCity = citiesByState[stateSlug].find(c => c.slug === citySlug);
      if (foundCity) return foundCity;
    }
    return { 
        name: citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
        slug: citySlug, 
        stateName: 'India' 
    };
  }, [citySlug]);

  const citiesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'cities'), where('name', '==', cityDetails.name));
  }, [firestore, cityDetails.name]);
  
  const { data: cities, isLoading: isCitiesLoading } = useCollection(citiesQuery);

  const cityId = cities?.[0]?.id;

  const homestaysQuery = useMemoFirebase(() => {
    if (!firestore || !cityId) return null;
    return query(
      collection(firestore, 'homestays'),
      where('cityId', '==', cityId),
      where('isAvailable', '==', true)
    );
  }, [firestore, cityId]);

  const { data: homestays, isLoading: isHomestaysLoading } = useCollection(homestaysQuery);
  
  const isLoading = isCitiesLoading || (cityId && isHomestaysLoading);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/explore">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Explore</span>
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">TourMate</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="ghost">
              <Link href="#">Login</Link>
            </Button>
            <Button asChild>
              <Link href="#">Sign Up</Link>
            </Button>
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
                     <Link href="/" className="flex items-center gap-3 mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                      <span className="text-2xl font-bold tracking-tight">
                        TourMate
                      </span>
                    </Link>
                    <Link href="#" className="text-lg">Login</Link>
                    <Link href="#" className="text-lg">Sign Up</Link>
                    <Link href="/explore" className="text-lg">Destinations</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-headline font-bold mb-2">
          Homestays in {cityDetails.name}
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover unique places to stay in {cityDetails.stateName} and make your trip unforgettable.
        </p>
        
        {isLoading && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <HomestayCardSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && homestays && homestays.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homestays.map(homestay => (
              <HomestayCard key={homestay.id} homestay={homestay} />
            ))}
          </div>
        )}

        {!isLoading && (!homestays || homestays.length === 0) && (
          <div className="text-center bg-card border rounded-lg p-12 mt-8">
            <h2 className="text-2xl font-semibold mb-2">No Homestays Found</h2>
            <p className="text-muted-foreground">
              There are currently no available homestays listed for {cityDetails.name}.
            </p>
            <Button asChild className="mt-6">
              <Link href="/explore">Explore Other Cities</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
