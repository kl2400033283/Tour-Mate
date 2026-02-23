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
    </main>
  );
}
