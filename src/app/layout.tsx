import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/lib/lenis";
import { CustomCursor } from "@/components/ui/CustomCursor";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Theeran | Flagship Digital Identity Platform",
  description: "Architecting high-performance digital identities, cinematic media systems, and spatial web platforms.",
  keywords: ["Theeran", "Digital Architect", "Next.js", "WebGL", "Framer Motion", "Forge Archive", "Cinematography"],
  authors: [{ name: "Theeran" }],
  openGraph: {
    title: "Theeran | Flagship Digital Identity Platform",
    description: "Architecting high-performance digital identities, cinematic media, and spatial web systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${cinzel.variable}`}>
      <body className="bg-brand-primary text-brand-light antialiased selection:bg-brand-highlight/30 selection:text-white">
        <LenisProvider>
          <CustomCursor />
          <Header />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
