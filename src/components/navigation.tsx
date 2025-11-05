'use client';

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from '@clerk/nextjs';
import { Button } from './ui/button';
import { Brain, Menu, X, Sparkles, FileUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-2 transition-all duration-300 relative px-3 py-2 rounded-lg ${
      pathname === path
        ? 'text-white font-semibold bg-white/5 after:content-[""] after:absolute after:left-0 after:-bottom-[3px] after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500 after:rounded-full after:animate-[fadeSlideIn_0.4s_ease-out] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]'
        : 'text-white/70 hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      <style jsx global>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-950 border-b border-white/10 backdrop-blur-xl">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo Section with link to home */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-lg p-1.5 sm:p-2">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold text-white tracking-tight">
                  RAG Chatbot
                </span>
                <span className="text-[10px] sm:text-xs text-indigo-300 -mt-0.5 hidden sm:block">
                  AI Knowledge Assistant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link href="/chat" className={linkClass('/chat')}>
                <MessageSquare className="w-4 h-4" />
                <span>Chatbot</span>
              </Link>

              <Link href="/upload" className={linkClass('/upload')}>
                <FileUp className="w-4 h-4" />
                <span>Upload PDF</span>
              </Link>

              <div className="w-px h-8 bg-white/10 mx-2"></div>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 px-4 lg:px-6 h-9 lg:h-10 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="relative group bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 px-4 lg:px-6 h-9 lg:h-10 overflow-hidden cursor-pointer">
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Sign Up
                    </span>
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <Button
                    variant="outline"
                    className="border-purple-500/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-white transition-all duration-300 px-4 lg:px-6 h-9 lg:h-10 cursor-pointer"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute left-0 right-0 top-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-300">
              <div className="container mx-auto px-4 py-4 space-y-2">
                <Link
                  href="/chat"
                  className={`${linkClass('/chat')} w-full justify-start`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chatbot</span>
                </Link>

                <Link
                  href="/upload"
                  className={`${linkClass('/upload')} w-full justify-start`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileUp className="w-4 h-4" />
                  <span>Upload PDF</span>
                </Link>

                <div className="h-px bg-white/10 my-2"></div>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="w-full text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 h-11 justify-start cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button
                      className="w-full relative group bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white border-0 shadow-lg shadow-indigo-500/25 h-11 justify-start overflow-hidden cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Sign Up
                      </span>
                    </Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <SignOutButton>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-white transition-all duration-300 h-11 justify-start cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </div>
          )}
        </div>

        {/* Subtle glow effect at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </nav>
    </>
  );
};
