import type { Metadata } from 'next'; // Import Next.js type for page metadata
import { Geist, Geist_Mono } from 'next/font/google'; // Import Google fonts via Next.js font optimization
import './globals.css'; // Import global CSS for the project
import { ClerkProvider } from '@clerk/nextjs'; // Import Clerk provider for authentication context
import { Navigation } from '@/components/navigation'; // Import custom Navigation component (SignIn/SignOut buttons, logo)

// Configure Geist Sans font and assign it to a CSS variable
const geistSans = Geist({
  variable: '--font-geist-sans', // CSS variable to use this font
  subsets: ['latin'], // Font subset
});

// Configure Geist Mono font and assign it to a CSS variable
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata for the app (title and description shown in browser and SEO)
export const metadata: Metadata = {
  title: 'RAG Chatbot',
  description: 'RAG Chatbot for practice and learning',
};

// Root layout component wraps the entire app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type for the children prop
}>) {
  return (
    // ClerkProvider wraps the app and provides authentication context to all child components
    <ClerkProvider>
      <html lang="en">
        <body
          // Apply fonts via CSS variables and enable anti-aliasing for smoother text
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
