import Image from 'next/image';

export default function Page() {
  const imageUrl =
    'https://storage.googleapis.com/project-spark-b1c94.appspot.com/static/1f29c669-e700-4b36-9b59-71511a84f378';

  return (
    <main className="relative h-screen w-screen">
      <Image
        src={imageUrl}
        alt="A collage of famous landmarks in India."
        fill
        className="object-cover"
        data-ai-hint="India travel"
        priority
      />
    </main>
  );
}
