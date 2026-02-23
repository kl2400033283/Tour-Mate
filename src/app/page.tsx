import { BuilderProvider } from '@/components/builder/builder-provider';
import { BuilderSidebar } from '@/components/builder/sidebar';
import { BuilderCanvas } from '@/components/builder/canvas';
import { BuilderToolbar } from '@/components/builder/toolbar';
import { PageHeader } from '@/components/builder/page-header';

export default function GenesisCanvasPage() {
  return (
    <BuilderProvider>
      <div className="flex h-screen w-full flex-col bg-background font-body text-foreground">
        <PageHeader />
        <div className="flex flex-1 overflow-hidden">
          <BuilderSidebar />
          <main className="flex flex-1 flex-col overflow-hidden">
            <BuilderToolbar />
            <BuilderCanvas />
          </main>
        </div>
      </div>
    </BuilderProvider>
  );
}
