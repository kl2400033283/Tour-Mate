'use client';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAiDesignSuggestionsAction } from '@/lib/actions';
import { useBuilder } from '@/hooks/use-builder';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { CanvasElement, CanvasElementType } from '@/lib/types';
import type { AiDesignSuggestionsOutput } from '@/ai/flows/ai-design-suggestions';
import { Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  description: z
    .string()
    .min(10, 'Please describe your website in at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AiDesigner() {
  const [isLoading, setIsLoading] = useState(false);
  const { setElements } = useBuilder();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  const transformAiResponse = (
    response: AiDesignSuggestionsOutput
  ): CanvasElement[] => {
    return response.suggestedElements.map((el, index) => {
      let props: Record<string, any> = {};
      const type = el.type as CanvasElementType;

      switch (type) {
        case 'header':
        case 'hero':
          props = {
            text: el.placeholderContent || el.description,
            as: type === 'hero' ? 'h1' : 'h2',
          };
          break;
        case 'text-block':
        case 'text':
          props = { text: el.placeholderContent || el.description, as: 'p' };
          break;
        case 'image':
          props = {
            src: PlaceHolderImages.find(p => p.id === 'hero-image')?.imageUrl || 'https://picsum.photos/seed/ai1/1200/600',
            alt: el.description,
          };
          break;
        case 'button':
          props = { text: el.placeholderContent || 'Learn More' };
          break;
        default:
          props = { text: el.placeholderContent || el.description };
      }

      return {
        id: `${el.type}-${Date.now()}-${index}`,
        type: type,
        props: props,
      };
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setIsLoading(true);
    try {
      const result = await getAiDesignSuggestionsAction({
        websiteDescription: data.description,
      });
      if (result) {
        const newElements = transformAiResponse(result);
        setElements(newElements);
        toast({
          title: 'Design Generated!',
          description: 'Your new layout has been applied to the canvas.',
        });
      } else {
        throw new Error('AI did not return any suggestions.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to get AI suggestions.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-headline text-lg font-medium">AI Designer</h3>
        <p className="text-sm text-muted-foreground">
          Describe your website, and our AI will generate a layout for you.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Idea</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A portfolio for a photographer specializing in nature..."
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Design
          </Button>
        </form>
      </Form>
    </div>
  );
}
