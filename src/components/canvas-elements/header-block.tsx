import { cn } from '@/lib/utils';

interface HeaderBlockProps {
  text: string;
  isHero?: boolean;
}

export function HeaderBlock({ text, isHero = false }: HeaderBlockProps) {
  return (
    <header
      className={cn(
        'p-8 md:p-16 text-center',
        isHero
          ? 'bg-primary/20'
          : 'bg-muted/30'
      )}
    >
      <h1
        className={cn(
          'font-headline font-bold',
          isHero
            ? 'text-4xl md:text-6xl tracking-tighter'
            : 'text-3xl md:text-4xl tracking-tight'
        )}
      >
        {text}
      </h1>
    </header>
  );
}
