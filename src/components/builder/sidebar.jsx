'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Blocks, Bot, Settings } from 'lucide-react';
import { ComponentLibrary } from './component-library';
import { AiDesigner } from './ai-designer';
import { SeoSettings } from './seo-settings';
import { ScrollArea } from '@/components/ui/scroll-area';

export function BuilderSidebar() {
  return (
    <aside className="w-80 border-r bg-card flex flex-col">
      <Tabs defaultValue="components" className="flex flex-col h-full w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b shrink-0">
          <TabsTrigger value="components" className="rounded-none h-12 gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
            <Blocks className="h-4 w-4" /> Components
          </TabsTrigger>
          <TabsTrigger value="ai-designer" className="rounded-none h-12 gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
            <Bot className="h-4 w-4" /> AI
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-none h-12 gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
            <Settings className="h-4 w-4" /> Page
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="components" className="p-4 m-0">
            <ComponentLibrary />
          </TabsContent>
          <TabsContent value="ai-designer" className="p-4 m-0">
            <AiDesigner />
          </TabsContent>
          <TabsContent value="settings" className="p-4 m-0">
            <SeoSettings />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </aside>
  );
}
