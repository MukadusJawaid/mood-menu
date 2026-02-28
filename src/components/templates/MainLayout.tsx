'use client';

import React from 'react';
import { Navbar } from '../organisms/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      
      {/* Header section (optional based on route, but good for consistent PWA feel) */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-card-border px-4 py-3 md:hidden">
         <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
           {title || 'MoodMenu'}
         </h1>
      </header>

      {/* Navigation Layer */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-28 pb-16 min-h-screen flex flex-col gap-10 relative z-10">
        {title && (
          <div className="hidden md:block mb-4">
            <h1 className="text-4xl font-heading font-black text-text mb-2 tracking-tight">
              {title}
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
        )}
        
        {children}
      </main>
    </div>
  );
};
