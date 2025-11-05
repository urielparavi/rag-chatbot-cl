// src/app/chat/page.tsx

'use client';
// Marks this as a Client Component in Next.js, required for using hooks like useState and useChat

import { Fragment, useState } from 'react';
// Fragment allows grouping multiple JSX elements without extra divs
// useState is a React hook for managing local state

import { useChat } from '@ai-sdk/react';
// useChat hook provides:
// - messages: the conversation history
// - sendMessage: function to send new messages
// - status: status of the chat (idle, submitted, streaming)

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
// UI components for chat interface:
// - Conversation: wrapper for the conversation area
// - ConversationContent: scrollable area for messages
// - ConversationScrollButton: button to scroll to the bottom

import { Message, MessageContent } from '@/components/ai-elements/message';
// Components for rendering a single message:
// - Message: represents a chat message from user or assistant
// - MessageContent: inner container for message text

import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
// Components for the user input area:
// - PromptInput: main wrapper
// - PromptInputBody: container for textarea
// - PromptInputTextarea: input field where user types
// - PromptInputTools: additional tools like model selector, web search
// - PromptInputSubmit: submit button
// - PromptInputMessage: TypeScript type for messages sent

import { Response } from '@/components/ai-elements/response';
// Component that renders AI responses with markdown support

import { Loader } from '@/components/ai-elements/loader';
// Loader component for showing a loading indicator while AI is streaming a response

export default function RAGChatBot() {
  // Main React component for the RAG ChatBot

  const [input, setInput] = useState('');
  // State for the input field
  // input: current text
  // setInput: function to update text

  const { messages, sendMessage, status } = useChat();
  // useChat hook returns:
  // - messages: conversation history
  // - sendMessage: function to send message
  // - status: status of chat (idle, submitted, streaming)

  const handleSubmit = (message: PromptInputMessage) => {
    // Function called when user submits a message
    if (!message.text) {
      // Do not send empty messages
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput(''); // Clear the input after sending
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
      {/* Outer container: centers content, adds padding, sets height */}
      <div className="flex flex-col h-full">
        {/* Flex column to place conversation on top and input at bottom */}
        <Conversation className="h-full">
          <ConversationContent>
            {/* Map through all messages in the conversation */}
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, i) => {
                  // Each message can have multiple parts (text, code, etc.)
                  switch (part.type) {
                    case 'text':
                      // Only handle text parts
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            {/* 'from' indicates user or assistant for styling */}
                            <MessageContent>
                              <Response>{part.text}</Response>
                              {/* Renders the text and parses markdown */}
                            </MessageContent>
                          </Message>
                        </Fragment>
                      );
                    default:
                      return null; // Ignore other part types for now
                  }
                })}
              </div>
            ))}

            {/* Show loader when AI is generating response */}
            {(status === 'submitted' || status === 'streaming') && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
          {/* Button to scroll to the bottom of the conversation */}
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          {/* Input area for the user */}
          <PromptInputBody>
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // Bind textarea to input state
              className="w-full resize-none placeholder:text-gray-400 border-none outline-none"
            />
          </PromptInputBody>

          <div className="flex items-center justify-between">
            <PromptInputTools>
              {/* Placeholder for tools like model selector, web search */}
            </PromptInputTools>
            <PromptInputSubmit
              disabled={!input && !status} // Disable if empty input and not streaming
              status={status} // Shows status on the submit button
            />
          </div>
        </PromptInput>
      </div>
    </div>
  );
}
