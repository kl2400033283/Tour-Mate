export type CanvasElementType =
  | 'text'
  | 'image'
  | 'button'
  | 'header'
  | 'footer'
  | 'container'
  | 'navigation'
  | 'hero'
  | 'text-block';

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  props: Record<string, any>;
  children?: CanvasElement[];
};

export type PreviewMode = 'desktop' | 'tablet' | 'mobile';
