import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Navigation } from '@/components/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RAG Chatbot',
  description:
    'An AI-powered RAG Chatbot that lets users upload PDFs and perform semantic searches using embeddings and vector similarity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Include the Navigation component (navbar with SignIn/SignOut) */}
          <Navigation />

          {/* Render the main content of each page */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
