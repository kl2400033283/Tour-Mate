import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Page() {
  const backgroundImage = PlaceHolderImages.find(
    p => p.id === 'background-image'
  );

  return (
    <main className="relative h-screen w-screen">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover"
          data-ai-hint={backgroundImage.imageHint}
          priority
        />
      )}
      <div className="relative z-10 flex h-full items-center justify-center bg-black/20">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">Your Content Here</h1>
          <p className="mt-4 text-xl">Start building your page.</p>
        </div>
      </div>
    </main>
  );
}
