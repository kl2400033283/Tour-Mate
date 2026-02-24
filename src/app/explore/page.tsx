import Link from 'next/link';
import { Globe, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">TourMate</span>
          </Link>

          <div className="relative flex-1 max-w-xl mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for cities, destinations..."
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
        <h1 className="text-3xl font-bold text-center mb-8 font-headline">
          Explore Destinations in India
        </h1>
        <div className="text-center text-muted-foreground">
          <p>The city flashcards are coming soon!</p>
          <p className="text-sm mt-2">
            For now, feel free to use the search bar above.
          </p>
        </div>
      </main>
    </div>
  );
}
