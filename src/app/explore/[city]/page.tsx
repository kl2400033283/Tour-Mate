import Link from 'next/link';
import { Globe, ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { citiesByState } from '@/lib/tourist-cities';

export default function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  let cityData = null;

  // Find the city data from the city slug
  for (const stateSlug in citiesByState) {
    const foundCity = citiesByState[stateSlug].find(c => c.slug === citySlug);
    if (foundCity) {
      cityData = foundCity;
      break;
    }
  }

  const cityName = cityData ? cityData.name : citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
      <main className="container mx-auto py-8 text-center">
        {cityData ? (
            <>
                <h1 className="text-4xl font-headline font-bold mb-4">
                Welcome to {cityName}
                </h1>
                <p className="text-muted-foreground">
                Homestay listings and details for {cityName} are coming soon!
                </p>
            </>
        ) : (
            <div className="text-center">
                <h1 className="text-4xl font-headline font-bold mb-4">
                    City not found
                </h1>
                <p className="text-muted-foreground">
                    The city you are looking for does not exist.
                </p>
                <Button asChild className="mt-4">
                    <Link href="/explore">Back to Explore</Link>
                </Button>
            </div>
        )}
      </main>
    </div>
  );
}
