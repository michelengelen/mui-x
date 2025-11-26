'use client';

import * as React from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { LiveDemo } from '@/components/LiveDemo';
import { CodeExamples } from '@/components/CodeExamples';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <LiveDemo />
      <CodeExamples />
    </div>
  );
}
