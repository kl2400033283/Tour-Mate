'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Loader2, MapPin, Search, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { citiesByState } from '@/lib/tourist-cities.js';
import { notFound } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { generateListingsAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

const getCityData = (slug) => {
  if (!slug) return null;
  for (const state in citiesByState) {
    const city = citiesByState[state].find(c => c.slug === slug);
    if (city) return city;
  }
  return null;
};

function HomestayCard({ homestay }) {
  const { toast } = useToast();

  const handleConfirm = () => {
    toast({
      title: "Coming Soon!",
      description: "Booking functionality is under development."
    });
  };

  return (
    <Card className="overflow-hidden bg-card shadow-lg transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={`https://picsum.photos/seed/${homestay.imageHint?.replace(/\s/g, '-') || homestay.id}/400/300`}
            alt={homestay.name}
            fill
            className="object-cover"
            data-ai-hint={homestay.imageHint}
          />
        </div>
      </CardContent>
      <CardHeader className="p-3">
        <CardTitle className="text-base font-bold truncate">{homestay.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex-grow space-y-2">
        <p className="text-xs text-muted-foreground truncate">{homestay.location}</p>
        <p className="text-sm font-semibold">₹{homestay.price.toLocaleString()}/Night</p>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="font-bold text-sm">{homestay.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button className="w-full h-9" onClick={handleConfirm}>Confirm</Button>
      </CardFooter>
    </Card>
  );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-1/2" />
            </div>
             <Skeleton className="h-9 w-full" />
        </div>
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
    if (!isUserLoading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, isUserLoading, router, pathname]);
  
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
      .filter(stay => stay.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(stay => {
        if (priceRange === 'all') return true;
        const [minStr, maxStr] = priceRange.split('-');
        const min = Number(minStr);
        if (maxStr === 'Infinity') {
            return stay.price >= min;
        }
        const max = Number(maxStr);
        return stay.price >= min && stay.price <= max;
      })
      .filter(stay => {
        if (rating === 'all') return true;
        return stay.rating >= parseFloat(rating);
      });
  }, [homestays, searchQuery, priceRange, rating]);

  if (isUserLoading || !user) {
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
    <div className="flex flex-col min-h-screen bg-amber-50 text-gray-800">
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
                  <Link href="/profile">Profile</Link>
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
                      <span className="text-xl font-bold tracking-tight">
                        TourMate
                      </span>
                    </Link>
                    <Link href={`/explore/${citySlug}`} className="text-lg">Back to City</Link>
                    {user ? (
                        <Link href="/profile" className="text-lg">Profile</Link>
                    ) : (
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
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-2">Homestays in {city.name}</h1>
          <p className="text-lg text-muted-foreground">Find comfortable and verified stays near top attractions</p>
        </div>

        <div className="mb-8 p-4 bg-background rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search homestays..." 
                className="pl-10" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-2000">Under ₹2000</SelectItem>
                <SelectItem value="2000-5000">₹2000 - ₹5000</SelectItem>
                <SelectItem value="5000-Infinity">Above ₹5000</SelectItem>
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
                <h2 className="text-2xl font-semibold text-destructive">Failed to Load Homestays</h2>
                <p className="text-muted-foreground mt-2">{generationError}</p>
                <p className="text-muted-foreground mt-1">Please try again later.</p>
            </div>
        ) : filteredHomestays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHomestays.map(homestay => (
              <HomestayCard key={homestay.id} homestay={homestay} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-background rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">No Homestays Found</h2>
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
