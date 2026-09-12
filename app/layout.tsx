import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimeOS — Personalized Anime Analytics & Taste Profile',
  description:
    'AnimeOS connects to your AniList account, synchronizes your library, and transforms your watching history into a personalized Anime DNA profile and smart recommendations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#09090B] text-[#F4F4F5] antialiased selection:bg-indigo-500/30 selection:text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
