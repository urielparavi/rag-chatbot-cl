import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Zap,
  Database,
  Search,
  Upload,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl p-4 sm:p-6">
                <Brain className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            RAG Intelligence
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-indigo-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Transform your documents into intelligent, searchable knowledge
            powered by AI vector embeddings and GPT-4
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link
              href="/chat"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Chatting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/upload"
              className="w-full sm:w-auto border-2 border-purple-500/50 bg-purple-500/10 text-purple-200 px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/20 hover:border-purple-400/70 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Documents
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {[
            {
              icon: Search,
              title: 'Vector Search',
              description:
                'Semantic search using 1536-dimensional embeddings for precise document retrieval',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Database,
              title: 'PostgreSQL Vector DB',
              description:
                'Neon serverless database with HNSW indexing for lightning-fast similarity search',
              gradient: 'from-indigo-500 to-purple-500',
            },
            {
              icon: Sparkles,
              title: 'GPT-4 Powered',
              description:
                'OpenAI GPT-4 integration for accurate, context-aware responses',
              gradient: 'from-pink-500 to-rose-500',
            },
            {
              icon: Zap,
              title: 'Real-time Streaming',
              description:
                'Live AI responses with streaming for instant feedback and natural conversation',
              gradient: 'from-amber-500 to-orange-500',
            },
            {
              icon: Upload,
              title: 'PDF Processing',
              description:
                'Automatic text extraction, chunking, and embedding generation from PDFs',
              gradient: 'from-emerald-500 to-teal-500',
            },
            {
              icon: TrendingUp,
              title: 'High Accuracy',
              description:
                '99.9% accuracy with intelligent chunking and overlap for context preservation',
              gradient: 'from-violet-500 to-purple-500',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-indigo-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {[
              {
                step: '1',
                title: 'Upload PDF',
                desc: 'Upload your documents to the system',
                icon: Upload,
              },
              {
                step: '2',
                title: 'Extract Text',
                desc: 'AI extracts and chunks the content',
                icon: FileText,
              },
              {
                step: '3',
                title: 'Generate Embeddings',
                desc: 'Create vector embeddings using OpenAI',
                icon: Sparkles,
              },
              {
                step: '4',
                title: 'Store in DB',
                desc: 'Save to PostgreSQL vector database',
                icon: Database,
              },
              {
                step: '5',
                title: 'Chat & Search',
                desc: 'Ask questions and get instant answers',
                icon: MessageSquare,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                    {item.step}
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 w-full">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-300">
                    {item.desc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-10 -right-2 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {[
            { value: '1536D', label: 'Vector Dimensions', icon: Database },
            { value: '<2s', label: 'Response Time', icon: Zap },
            { value: '99.9%', label: 'Accuracy', icon: TrendingUp },
            { value: '150', label: 'Chunk Size', icon: FileText },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-indigo-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-indigo-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Transform your documents into an intelligent knowledge base powered
            by cutting-edge AI technology
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Start Using RAG AI Now
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-xs sm:text-sm text-indigo-400/70">
            Powered by OpenAI • Neon PostgreSQL • Next.js • Clerk Auth
          </p>
        </div>
      </main>
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}
