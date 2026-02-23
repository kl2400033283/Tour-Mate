'use client';

import { createContext, useContext } from 'react';
import type { CanvasElement, PreviewMode } from '@/lib/types';

export interface BuilderContextType {
  elements: CanvasElement[];
  setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  addElement: (index: number, element: Omit<CanvasElement, 'id'>) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, newProps: Partial<CanvasElement['props']>) => void;
  selectedElement: CanvasElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<CanvasElement | null>>;

  seoConfig: { title: string; description: string };
  setSeoConfig: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;

  previewMode: PreviewMode;
  setPreviewMode: React.Dispatch<React.SetStateAction<PreviewMode>>;
}

export const BuilderContext = createContext<BuilderContextType | null>(null);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
