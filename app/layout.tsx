import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RadGuide - Dijital Radyoloji Rehberiniz",
  description: "Çekim protokolleri, görüntü analizleri ve yapay zekâ destekli değerlendirme araçları tek platformda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased bg-background-dark`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
