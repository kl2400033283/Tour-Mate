import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowLeft, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { citiesByState } from '@/lib/tourist-cities';

export default function StatePage({ params }: { params: { city: string } }) {
  const stateSlug = params.city;
  const stateName = stateSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const cities = citiesByState[stateSlug] || [];

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

           <div className="relative flex-1 max-w-xl mx-4 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search for cities in ${stateName}...`}
              className="w-full rounded-full pl-10"
            />
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
                  <Link href="#" className="text-lg">About Us</Link>
                  <Link href="/explore" className="text-lg">Destinations</Link>
                  <Link href="#" className="text-lg">Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-2 font-headline">
          Explore Cities in {stateName}
        </h1>
         <div className="relative flex-1 max-w-xl mx-auto my-6 sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search in ${stateName}...`}
              className="w-full rounded-full pl-10"
            />
          </div>
        {cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link href={`/explore/${stateSlug}/${city.slug}`} key={city.slug}>
                <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-0">
                    <Image
                      src={city.image}
                      alt={`A scenic view of ${city.name}`}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                      data-ai-hint={city.hint}
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-center font-semibold text-lg">{city.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Tourist city listings for {stateName} are coming soon!
          </p>
        )}
      </main>
    </div>
  );
}