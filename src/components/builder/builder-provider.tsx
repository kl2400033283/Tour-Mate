'use client';

import React, { useState, ReactNode, useCallback } from 'react';
import { BuilderContext, type BuilderContextType } from '@/hooks/use-builder';
import type { CanvasElement, PreviewMode } from '@/lib/types';

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null
  );
  const [seoConfig, setSeoConfig] = useState({
    title: 'My Awesome Website',
    description: 'Built with Genesis Canvas',
  });
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const addElement = useCallback(
    (index: number, element: Omit<CanvasElement, 'id'>) => {
      const newElement: CanvasElement = {
        ...element,
        id: `${element.type}-${Date.now()}-${Math.random()}`,
      };
      setElements(prevElements => {
        const newElements = [...prevElements];
        newElements.splice(index, 0, newElement);
        return newElements;
      });
    },
    []
  );

  const removeElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  }, []);

  const updateElement = useCallback(
    (id: string, newProps: Partial<CanvasElement['props']>) => {
      setElements(prev =>
        prev.map(el =>
          el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
        )
      );
    },
    []
  );

  const value: BuilderContextType = {
    elements,
    setElements,
    addElement,
    removeElement,
    updateElement,
    selectedElement,
    setSelectedElement,
    seoConfig,
    setSeoConfig,
    previewMode,
    setPreviewMode,
  };

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}
