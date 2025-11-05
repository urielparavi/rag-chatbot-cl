'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  Database,
  Brain,
  Zap,
} from 'lucide-react';

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setMessage(null);

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      setMessage({
        type: 'success',
        text: `Successfully processed "${file.name}" - Created 28 searchable chunks`,
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Animated Background Elements */}
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

      <div className="relative z-10 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              RAG Knowledge Base
            </h1>
            <p className="text-base sm:text-lg text-indigo-300 max-w-2xl mx-auto px-4">
              Transform your PDFs into intelligent, searchable knowledge using
              advanced AI embeddings and vector search
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Sparkles, title: 'AI Powered', desc: 'GPT-4 Integration' },
            { icon: Database, title: 'Vector DB', desc: 'Neon PostgreSQL' },
            { icon: Zap, title: 'Fast Search', desc: 'Semantic Matching' },
            { icon: FileText, title: 'PDF Parser', desc: 'Auto Chunking' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-purple-900/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-500/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400 mb-3" />
              <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Main Upload Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/5 backdrop-blur-2xl border border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Upload Document
                  </h2>
                  <p className="text-indigo-100 text-xs sm:text-sm mt-1">
                    Add PDFs to your knowledge base
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="relative">
                  <Label
                    htmlFor="pdf-upload"
                    className="block text-sm sm:text-base font-medium text-gray-200 mb-3"
                  >
                    Select PDF File
                  </Label>

                  <div className="relative group">
                    <div className="flex items-center border-2 border-dashed border-purple-500/50 hover:border-indigo-400 transition-all duration-300 rounded-lg p-4 sm:p-6 bg-purple-900/30">
                      <Input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        disabled={isLoading}
                        className="cursor-pointer file:mr-4 file:py-0 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30 file:cursor-pointer text-sm sm:text-base border-0 p-0 h-auto text-gray-300"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {fileName && !isLoading && (
                    <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-indigo-300 bg-purple-900/40 rounded-lg p-2 sm:p-3">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span className="truncate">{fileName}</span>
                    </div>
                  )}
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl p-4 sm:p-6 border border-purple-500/30">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-indigo-400" />
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm sm:text-base">
                          Processing PDF...
                        </p>
                        <p className="text-xs sm:text-sm text-indigo-300 mt-1">
                          Extracting text, chunking, and generating embeddings
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-purple-900/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Success/Error Messages */}
                {message && (
                  <Alert
                    variant={
                      message.type === 'error' ? 'destructive' : 'default'
                    }
                    className={`border-2 ${
                      message.type === 'error'
                        ? 'bg-red-900/40 border-red-500/50'
                        : 'bg-gradient-to-r from-emerald-900/40 to-green-900/40 border-green-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.type === 'error' ? (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <AlertTitle
                          className={`font-semibold text-sm sm:text-base ${
                            message.type === 'error'
                              ? 'text-red-200'
                              : 'text-green-200'
                          }`}
                        >
                          {message.type === 'error'
                            ? 'Upload Failed'
                            : 'Success!'}
                        </AlertTitle>
                        <AlertDescription
                          className={`text-xs sm:text-sm mt-1 ${
                            message.type === 'error'
                              ? 'text-red-300'
                              : 'text-green-300'
                          }`}
                        >
                          {message.text}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                )}

                {/* Info Box */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl p-4 sm:p-6 border border-indigo-500/30">
                  <h3 className="font-semibold text-white mb-3 text-sm sm:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                    How it works
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-indigo-200">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">
                        1.
                      </span>
                      <span>Upload your PDF document to the system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">
                        2.
                      </span>
                      <span>AI extracts and chunks the text automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">
                        3.
                      </span>
                      <span>Vector embeddings are generated using OpenAI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">
                        4.
                      </span>
                      <span>
                        Content is stored in PostgreSQL vector database
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">
                        5.
                      </span>
                      <span>
                        Chat with your documents using semantic search
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-md border border-purple-500/30">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-400">
                1536
              </div>
              <div className="text-xs sm:text-sm text-indigo-300 mt-1">
                Embedding Dims
              </div>
            </div>
            <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-md border border-purple-500/30">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                150
              </div>
              <div className="text-xs sm:text-sm text-indigo-300 mt-1">
                Chunk Size
              </div>
            </div>
            <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-md border border-purple-500/30 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-pink-400">
                HNSW
              </div>
              <div className="text-xs sm:text-sm text-indigo-300 mt-1">
                Vector Index
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-indigo-400/70">
            Powered by OpenAI • Neon PostgreSQL • Next.js • Clerk Auth
          </p>
        </div>
      </div>
    </div>
  );
}
