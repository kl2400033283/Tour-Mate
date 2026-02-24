'use client';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <MapPin className="h-12 w-12 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome, Admin!</p>
      <Link href="/" className="text-primary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
