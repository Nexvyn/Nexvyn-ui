import Link from 'next/link';
import { Button } from '@/components/Button/index';

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Beautiful UI Components
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern, accessible, and customizable React component library built with TypeScript and Tailwind CSS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button size="lg" variant="default" asChild>
            <Link href="/docs/getting-started/installation">
              Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">
              View Documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

