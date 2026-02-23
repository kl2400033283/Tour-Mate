import { Button } from '@/components/ui/button';

interface ButtonBlockProps {
  text: string;
}

export function ButtonBlock({ text }: ButtonBlockProps) {
  return (
    <div className="p-4 text-center">
      <Button size="lg">{text}</Button>
    </div>
  );
}
