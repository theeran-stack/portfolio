// @/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/context/ThemeContext';
import { ModeProvider } from '@/context/ModeContext';
import { WelcomeProvider } from '@/context/WelcomeContext';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WelcomeScreen } from '@/components/layout/WelcomeScreen';
import { siteConfig } from '@/config/site.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.seo.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-mode="hybrid">
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col justify-between`}>
        <ThemeProvider>
          <ModeProvider>
            <WelcomeProvider>
              <Navbar />
              <WelcomeScreen />
              <main className="flex-1 pt-24 pb-16">
                {children}
              </main>
              <Footer />
            </WelcomeProvider>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
