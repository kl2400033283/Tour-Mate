import Link from 'next/link';
import Image from 'next/image';
import { Globe, Search, Menu } from 'lucide-react';
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

export default function ExplorePage() {
  const states = [
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh', image: 'https://picsum.photos/seed/andhra-pradesh/400/300', hint: 'andhra pradesh temple' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', image: 'https://picsum.photos/seed/arunachal-pradesh/400/300', hint: 'arunachal pradesh mountains' },
    { name: 'Assam', slug: 'assam', image: 'https://picsum.photos/seed/assam/400/300', hint: 'assam tea' },
    { name: 'Bihar', slug: 'bihar', image: 'https://picsum.photos/seed/bihar/400/300', hint: 'bihar bodhgaya' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh', image: 'https://picsum.photos/seed/chhattisgarh/400/300', hint: 'chhattisgarh waterfall' },
    { name: 'Goa', slug: 'goa', image: 'https://picsum.photos/seed/goa/400/300', hint: 'goa beach' },
    { name: 'Gujarat', slug: 'gujarat', image: 'https://picsum.photos/seed/gujarat/400/300', hint: 'gujarat rann of kutch' },
    { name: 'Haryana', slug: 'haryana', image: 'https://picsum.photos/seed/haryana/400/300', hint: 'haryana fields' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh', image: 'https://picsum.photos/seed/himachal-pradesh/400/300', hint: 'himachal pradesh himalayas' },
    { name: 'Jharkhand', slug: 'jharkhand', image: 'https://picsum.photos/seed/jharkhand/400/300', hint: 'jharkhand waterfalls' },
    { name: 'Karnataka', slug: 'karnataka', image: 'https://picsum.photos/seed/karnataka/400/300', hint: 'karnataka hampi' },
    { name: 'Kerala', slug: 'kerala', image: 'https://picsum.photos/seed/kerala/400/300', hint: 'kerala backwaters' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh', image: 'https://picsum.photos/seed/madhya-pradesh/400/300', hint: 'madhya pradesh temples' },
    { name: 'Maharashtra', slug: 'maharashtra', image: 'https://picsum.photos/seed/maharashtra/400/300', hint: 'maharashtra mumbai' },
    { name: 'Manipur', slug: 'manipur', image: 'https://picsum.photos/seed/manipur/400/300', hint: 'manipur loktak lake' },
    { name: 'Meghalaya', slug: 'meghalaya', image: 'https://picsum.photos/seed/meghalaya/400/300', hint: 'meghalaya living root bridge' },
    { name: 'Mizoram', slug: 'mizoram', image: 'https://picsum.photos/seed/mizoram/400/300', hint: 'mizoram hills' },
    { name: 'Nagaland', slug: 'nagaland', image: 'https://picsum.photos/seed/nagaland/400/300', hint: 'nagaland tribes' },
    { name: 'Odisha', slug: 'odisha', image: 'https://picsum.photos/seed/odisha/400/300', hint: 'odisha temples' },
    { name: 'Punjab', slug: 'punjab', image: 'https://picsum.photos/seed/punjab/400/300', hint: 'punjab golden temple' },
    { name: 'Rajasthan', slug: 'rajasthan', image: 'https://picsum.photos/seed/rajasthan/400/300', hint: 'rajasthan forts' },
    { name: 'Sikkim', slug: 'sikkim', image: 'https://picsum.photos/seed/sikkim/400/300', hint: 'sikkim monasteries' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu', image: 'https://picsum.photos/seed/tamil-nadu/400/300', hint: 'tamil nadu temples' },
    { name: 'Telangana', slug: 'telangana', image: 'https://picsum.photos/seed/telangana/400/300', hint: 'telangana hyderabad' },
    { name: 'Tripura', slug: 'tripura', image: 'https://picsum.photos/seed/tripura/400/300', hint: 'tripura palace' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh', image: 'https://picsum.photos/seed/uttar-pradesh/400/300', hint: 'uttar pradesh taj mahal' },
    { name: 'Uttarakhand', slug: 'uttarakhand', image: 'https://picsum.photos/seed/uttarakhand/400/300', hint: 'uttarakhand mountains' },
    { name: 'West Bengal', slug: 'west-bengal', image: 'https://picsum.photos/seed/west-bengal/400/300', hint: 'west bengal kolkata' },
  ];

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
              placeholder="Search for states, destinations..."
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
          Explore States in India
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {states.map((state) => (
            <Link href={`/explore/${state.slug}`} key={state.slug}>
              <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-0">
                   <Image
                    src={state.image}
                    alt={`A scenic view of ${state.name}`}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                    data-ai-hint={state.hint}
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-center font-semibold text-lg">{state.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
