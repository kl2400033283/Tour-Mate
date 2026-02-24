'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { citiesByState } from '@/lib/tourist-cities.js';

function AttractionCard({ attraction }) {
  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <Image
        src={attraction.image || 'https://picsum.photos/seed/attraction/400/250'}
        alt={attraction.name}
        width={400}
        height={250}
        className="h-48 w-full object-cover"
        data-ai-hint={attraction.hint}
      />
      <CardHeader>
        <CardTitle className="font-bold text-xl">{attraction.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{attraction.description}</p>
      </CardContent>
    </Card>
  );
}


export default function CityPage({ params }) {
  const citySlug = params.city;

  const allCities = Object.values(citiesByState).flat();
  const cityDetails = allCities.find(c => c.slug === citySlug) || {
    name: citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    slug: citySlug,
    attractionDetails: [],
  };
  
  const attractions = cityDetails.attractionDetails || [];

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
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
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
                    <Link href="/login" className="text-lg">Login</Link>
                    <Link href="/signup" className="text-lg">Sign Up</Link>
                    <Link href="/explore" className="text-lg">Destinations</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-headline font-bold mb-2">
          Attractions in {cityDetails.name}
        </h1>
        <p className="text-muted-foreground mb-8">
          Explore the top sights and experiences this city has to offer.
        </p>
        
        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-card border rounded-lg p-12 mt-8">
            <h2 className="text-2xl font-semibold mb-2">Attractions Coming Soon!</h2>
            <p className="text-muted-foreground">
              We are currently curating the best attractions for {cityDetails.name}. Please check back later.
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
