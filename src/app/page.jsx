import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Page() {
  const imageUrl =
    'https://images.unsplash.com/photo-1529846835765-17c4596c5efa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="relative h-screen w-screen text-white">
      <Image
        src={imageUrl}
        alt="Hawa Mahal"
        fill
        className="object-cover"
        data-ai-hint="Hawa Mahal Jaipur"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col">
        <header className="p-4 sm:p-6">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold tracking-tight">
                TourMate
              </span>
            </Link>
            <nav className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="#">About Us</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/explore">Destinations</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="#">Contact</Link>
              </Button>
            </nav>
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 pt-8">
                     <Link href="/" className="flex items-center gap-3 mb-4">
                      <Globe className="h-8 w-8" />
                      <span className="text-2xl font-bold tracking-tight">
                        TourMate
                      </span>
                    </Link>
                    <Link href="/login" className="text-lg">Login</Link>
                    <Link href="#" className="text-lg">About Us</Link>
                    <Link href="/explore" className="text-lg">Destinations</Link>
                    <Link href="#" className="text-lg">Contact</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
          <div className="space-y-6">
            <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl">
              TourMate
            </h1>
            <p className="mx-auto max-w-md text-lg text-white/80 sm:text-xl">
              Where Travel Meets Comfort
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
            >
              <Link href="/explore">Explore with TourMate</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
