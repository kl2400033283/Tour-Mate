'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Loader2, MapPin, Search, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="overflow-hidden bg-card shadow-lg flex flex-col rounded-xl">
        <div className="relative h-56 w-full">
            <Image
            src={`https://picsum.photos/seed/${homestay.imageHint?.replace(/\s/g, '-') || homestay.id}/400/300`}
            alt={homestay.name}
            fill
            className="object-cover"
            data-ai-hint={homestay.imageHint}
            />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col bg-white">
            <h3 className="text-xl font-bold mb-1">{homestay.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{homestay.location}</p>
            
            <div className="flex items-center justify-between my-2">
                <p className="text-lg font-semibold">{homestay.price.toLocaleString()}/Night</p>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-bold text-sm">{homestay.rating.toFixed(1)}</span>
                </div>
            </div>

            <p className="text-sm text-muted-foreground flex-grow mb-4">{homestay.description}</p>
            
            <Button className="w-full mt-auto" onClick={handleConfirm}>Confirm</Button>
        </CardContent>
    </Card>
  );
}

function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3 bg-white rounded-xl p-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2 pt-2">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full mt-2" />
            </div>
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

  const [filters, setFilters] = useState({
    searchQuery: '',
    priceRange: 'all',
    rating: 'all',
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push(`/login?redirect=${pathname}`);
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

    if(user) {
        fetchHomestays();
    }
  }, [citySlug, city?.name, user]);

  const filteredHomestays = useMemo(() => {
    if (!homestays) return [];
    return homestays
      .filter(stay => stay.name.toLowerCase().includes(appliedFilters.searchQuery.toLowerCase()))
      .filter(stay => {
        if (appliedFilters.priceRange === 'all') return true;
        const [minStr, maxStr] = appliedFilters.priceRange.split('-');
        const min = Number(minStr);
        if (maxStr === 'Infinity') {
            return stay.price >= min;
        }
        const max = Number(maxStr);
        return stay.price >= min && stay.price <= max;
      })
      .filter(stay => {
        if (appliedFilters.rating === 'all') return true;
        return stay.rating >= parseFloat(appliedFilters.rating);
      });
  }, [homestays, appliedFilters]);

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              TourMate
            </span>
          </Link>
          
          <nav className="hidden items-center gap-4 sm:flex">
             <Button asChild variant="outline" className="bg-white/80">
                <Link href={`/explore/${citySlug}`}>Back</Link>
            </Button>
            {user ? (
                <Button asChild className="bg-white/80" variant="outline">
                  <Link href="/profile">Profile</Link>
                </Button>
              ) : (
                <Button asChild className="bg-white/80" variant="outline">
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
        <div className="text-left mb-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-2">Homestays in {city.name}</h1>
          <p className="text-lg text-foreground/80">Find comfortable and verified stays near top attractions</p>
        </div>

        <div className="mb-12 p-4 bg-card rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search homestays..." 
                className="pl-10" 
                value={filters.searchQuery}
                onChange={e => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
              />
            </div>
            <Select value={filters.priceRange} onValueChange={value => setFilters(f => ({ ...f, priceRange: value }))}>
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
            <Select value={filters.rating} onValueChange={value => setFilters(f => ({ ...f, rating: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4">4 Stars & above</SelectItem>
                <SelectItem value="4.5">4.5 Stars & above</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleApplyFilters} className="w-full h-10">Apply</Button>
          </div>
        </div>
        
        {isGenerating ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHomestays.map(homestay => (
              <HomestayCard key={homestay.id} homestay={homestay} />
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

       <footer className="border-t mt-16">
        <div className="container mx-auto text-center py-6 text-muted-foreground text-sm">
            <p>TourMate | Quick Links | For Users | Contact @ {new Date().getFullYear()} TourMate | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
