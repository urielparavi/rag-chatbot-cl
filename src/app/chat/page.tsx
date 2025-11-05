'use client';

import { Fragment, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Response } from '@/components/ai-elements/response';
import { Loader } from '@/components/ai-elements/loader';
import {
  Brain,
  Sparkles,
  Zap,
  Database,
  Search,
  MessageSquare,
  User,
  Bot,
  FileText,
  TrendingUp,
} from 'lucide-react';

export default function RAGChatBot() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput('');
  };

  const isStreaming = status === 'submitted' || status === 'streaming';
  const hasMessages = messages.length > 0;

  return (
    <>
      <style jsx global>{`
        /* Custom Scrollbar Styles */
        .chat-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .chat-scrollbar::-webkit-scrollbar-track {
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(99, 102, 241, 0.6),
            rgba(168, 85, 247, 0.6)
          );
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(99, 102, 241, 0.8),
            rgba(168, 85, 247, 0.8)
          );
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        /* Firefox */
        .chat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.6) rgba(99, 102, 241, 0.1);
        }
      `}</style>

      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 relative">
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

        <div className="relative z-10 max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 h-[calc(100vh-4rem)]">
          <div className="flex flex-col h-full gap-3 sm:gap-4">
            {/* Top Header Bar */}
            <div className="flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl p-2 sm:p-2.5">
                          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                          RAG Intelligence
                        </h1>
                        <p className="text-xs sm:text-sm text-indigo-300">
                          AI-Powered Knowledge Assistant
                        </p>
                      </div>
                    </div>

                    {/* Right: Stats & Status */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg border border-white/10 flex-1 sm:flex-initial">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                        <span className="text-xs sm:text-sm font-medium text-emerald-300">
                          Active
                        </span>
                      </div>
                      <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-lg border border-white/10">
                        <FileText className="w-4 h-4 text-indigo-300" />
                        <span className="text-xs text-indigo-300">
                          {messages.length} messages
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Capability Pills */}
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                    {[
                      {
                        icon: Search,
                        label: 'Vector Search',
                        gradient: 'from-blue-500 to-cyan-500',
                      },
                      {
                        icon: Database,
                        label: 'Knowledge Base',
                        gradient: 'from-indigo-500 to-purple-500',
                      },
                      {
                        icon: Zap,
                        label: 'Real-time',
                        gradient: 'from-amber-500 to-orange-500',
                      },
                      {
                        icon: Sparkles,
                        label: 'GPT-4',
                        gradient: 'from-pink-500 to-rose-500',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}
                        ></div>
                        <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 group-hover:text-white transition-colors" />
                        <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area - With custom scrollbar */}
            <div className="flex-1 min-h-0 bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 chat-scrollbar">
                {!hasMessages && (
                  <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
                    {/* Welcome Section */}
                    <div className="mb-6 sm:mb-8">
                      <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border border-white/20">
                          <MessageSquare className="w-14 h-14 sm:w-20 sm:h-20 text-indigo-300 mx-auto" />
                        </div>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                        Welcome to RAG AI
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg text-indigo-300 max-w-lg mx-auto leading-relaxed">
                        Ask questions about your documents and get instant,
                        accurate answers powered by advanced vector search
                      </p>
                    </div>

                    {/* Example Questions */}
                    <div className="w-full max-w-3xl">
                      <p className="text-xs sm:text-sm text-indigo-400 mb-3 sm:mb-4 font-medium uppercase tracking-wide">
                        Try asking:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {[
                          {
                            q: "What's our vacation policy?",
                            icon: '🏖️',
                            desc: 'Company benefits',
                          },
                          {
                            q: 'Tell me about professional development',
                            icon: '📚',
                            desc: 'Learning opportunities',
                          },
                          {
                            q: 'How does expense reimbursement work?',
                            icon: '💰',
                            desc: 'Financial policies',
                          },
                          {
                            q: 'What are the health benefits?',
                            icon: '🏥',
                            desc: 'Healthcare coverage',
                          },
                        ].map((example, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInput(example.q)}
                            className="group flex items-start gap-3 p-3 sm:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:scale-[1.02] text-left cursor-pointer"
                          >
                            <span className="text-2xl sm:text-3xl flex-shrink-0">
                              {example.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-white group-hover:text-indigo-300 transition-colors mb-1 leading-tight">
                                {example.q}
                              </p>
                              <p className="text-xs text-indigo-400/70 group-hover:text-indigo-400 transition-colors">
                                {example.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                      {[
                        { icon: TrendingUp, value: '99.9%', label: 'Accuracy' },
                        { icon: Zap, value: '<2s', label: 'Response' },
                        { icon: Database, value: '1536D', label: 'Vectors' },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                            <span className="text-lg sm:text-xl font-bold text-white">
                              {stat.value}
                            </span>
                          </div>
                          <p className="text-xs text-indigo-400">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="mb-4 sm:mb-6 last:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <Fragment key={`${message.id}-${i}`}>
                              <div
                                className={`flex gap-2 sm:gap-3 ${
                                  message.role === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                                }`}
                              >
                                {message.role === 'assistant' && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-md opacity-75"></div>
                                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <Message
                                  from={message.role}
                                  className={`max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] ${
                                    message.role === 'user'
                                      ? 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-md shadow-xl shadow-indigo-500/20'
                                      : 'bg-white/10 backdrop-blur-xl text-white rounded-2xl rounded-tl-md border border-white/20 shadow-xl'
                                  }`}
                                >
                                  <MessageContent className="p-3 sm:p-4">
                                    <Response className="text-sm sm:text-base leading-relaxed [&_code]:bg-black/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-black/30 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto">
                                      {part.text}
                                    </Response>
                                  </MessageContent>
                                </Message>
                                {message.role === 'user' && (
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg blur-md opacity-75"></div>
                                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                        <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Fragment>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}

                {/* Loading State */}
                {isStreaming && (
                  <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tl-md border border-white/20 shadow-xl p-4 sm:p-5">
                      <Loader />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <PromptInput onSubmit={handleSubmit}>
                  <PromptInputBody className="p-3 sm:p-4">
                    <PromptInputTextarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything about your documents..."
                      className="w-full resize-none placeholder:text-indigo-400/50 border-none outline-none bg-transparent text-white text-sm sm:text-base min-h-[60px] sm:min-h-[70px] max-h-[180px] mt-6"
                    />
                  </PromptInputBody>

                  <div className="flex items-center justify-between px-3 sm:px-4 pb-3 sm:pb-4 pt-4 border-t border-white/10">
                    <PromptInputTools className="flex items-center gap-2">
                      {input.length > 0 && (
                        <span className="text-xs text-indigo-400/70 bg-white/5 px-2 py-1 rounded-md hidden sm:inline-block">
                          {input.length} chars
                        </span>
                      )}
                    </PromptInputTools>
                    <PromptInputSubmit
                      disabled={!input.trim() || isStreaming}
                      status={status}
                      className="relative group bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer text-sm sm:text-base overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative">Send</span>
                    </PromptInputSubmit>
                  </div>
                </PromptInput>
              </div>

              {/* Footer Tip */}
              <div className="mt-2 sm:mt-3 text-center">
                <p className="text-xs text-indigo-400/70">
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Powered by semantic search • Get instant answers from your
                    knowledge base
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
