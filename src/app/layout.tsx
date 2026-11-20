import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/academy/header';
import { Footer } from '@/components/academy/footer';
import { ExperienceProvider } from '@/components/academy/experience';
export const metadata: Metadata = {
  title: {default:'Ambit Academy — Learn smarter. Dream bigger.',template:'%s | Ambit Academy'},
  description: 'Discover small-group classes for Grades 1–12 at Ambit Academy. Explore our 3D classroom, try smart-board learning, and find a programme for your child.',
  applicationName:'Ambit Academy',
};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><ExperienceProvider><Header/><main id="main-content">{children}</main><Footer/></ExperienceProvider></body></html>;}
