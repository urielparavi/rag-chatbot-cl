import Link from 'next/link';
import { AlertTriangle, MessageCircle, Home } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | RAG Chatbot',
  description: 'The page you are looking for does not exist in RAG Chatbot',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-cyan-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 px-4 py-8">
      {/* Background floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-cyan-200 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4">
          Oops! Page not found
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-6 px-4">
          The page you're looking for doesn't exist in RAG Chatbot. Return to the main interface and continue exploring smart answers in real time.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-900/40">
            <MessageCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-2" />
            <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
              ✗ Maybe the question or page does not exist
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 rounded-xl border border-green-200 dark:border-green-900/40">
            <Home className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
            <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
              ✓ Go back to the main interface and start asking questions
            </p>
          </div>
        </div>

        {/* Return button */}
        <Link href="/">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-transform hover:scale-105 active:scale-95">
            <Home className="w-5 h-5" />
            Return to Main Interface
          </button>
        </Link>

        {/* Footer tip */}
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 italic">
          💡 Tip: Ask a different question to see RAG Chatbot in action!
        </p>

        {/* Animated bouncing message icons */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <MessageCircle className="w-5 h-5 text-cyan-500 animate-bounce" style={{ animationDelay: '0s' }} />
          <MessageCircle className="w-5 h-5 text-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <MessageCircle className="w-5 h-5 text-cyan-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          RAG Chatbot - smart answers in real-time
        </p>
      </div>
    </div>
  );
}
