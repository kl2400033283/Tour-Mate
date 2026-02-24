'use client';

import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Loader2, MapPin, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HireLocalGuidePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const cityName = params.city ? (params.city).charAt(0).toUpperCase() + (params.city).slice(1) : 'this city';

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="p-4 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              TourMate
            </span>
          </Link>
          <Button asChild variant="outline">
            <Link href={`/explore/${params.city}`}>Back to City</Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl pt-4">Hire a Local Guide</CardTitle>
            <CardDescription>Enhance your experience in {cityName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is coming soon! You are seeing this page because you are successfully logged in.
            </p>
            <Button className="mt-6">Find Guides</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
