import * as React from 'react';
import { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import { Navigation } from '@/components/Navigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'MUI X Editor - WYSIWYG Rich Text Editor',
  description: 'A powerful WYSIWYG editor component built with ProseMirror and MUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="app-layout">
            <Navigation />
            <main className="main-content">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
