import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Cadet Connect — Profile Demo', description: 'Independent Cadet Connect profile interface demo.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
