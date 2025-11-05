import {
  streamText, // Function to stream responses from the AI model in real-time
  UIMessage, // Type representing a chat message in the UI
  convertToModelMessages, // Converts UI messages into a format the AI model can understand
  tool, // Function to define tools the AI can use
  InferUITools, // TypeScript utility to infer types of the tools object
  UIDataTypes, // Predefined UI data types (text, files, etc.)
  stepCountIs, // Function to control how many steps the AI can perform
} from 'ai';

import { openai } from '@ai-sdk/openai'; // OpenAI SDK to access models like GPT-4.1-mini
import { z } from 'zod'; // Zod library to define input schemas for tools
import { searchDocuments } from '@/lib/search'; // Our custom function to search documents

// Define tools that the AI can use
const tools = {
  searchKnowledgeBase: tool({
    description: 'Search the knowledge base for relevant information', // Explanation for the AI
    inputSchema: z.object({
      query: z.string().describe('The search query to find relevant documents'), // Expected input for the tool
    }),
    execute: async ({ query }) => {
      // Function that runs when AI uses the tool
      try {
        const results = await searchDocuments(query, 3, 0.5); // Search up to 3 documents with similarity threshold 0.5

        if (results.length === 0) {
          // If no results found
          return 'No relevant information found in the knowledge base';
        }

        const formattedResults = results
          .map((r, i) => `[${i + 1}] ${r.content}`) // Format results with numbering
          .join('\n\n'); // Separate results with empty lines

        return formattedResults; // Return formatted results to AI
      } catch (error) {
        console.error('Search error:', error); // Log error if something goes wrong
        return 'Error searching the knowledge base'; // Return error message to AI
      }
    },
  }),
};

// Type for all the tools available in the chat
export type ChatTools = InferUITools<typeof tools>;

// Type representing a single chat message in our system
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
// never -> no extra metadata
// UIDataTypes -> allowed content types
// ChatTools -> tools AI can access

// Main POST handler for chat messages
export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    // Parse incoming JSON and ensure it matches our ChatMessage type

    const modelMessages = convertToModelMessages(messages);
    // Convert UI messages to model-friendly format

    const result = streamText({
      model: openai('gpt-4.1-mini'), // Specify which model to use
      messages: modelMessages, // Pass the converted messages
      tools, // Provide tools the AI can use
      system: `You are a helpful assistant with access to a knowledge base. 
          When users ask questions, search the knowledge base for relevant information.
          Always search before answering if the question might relate to uploaded documents.
          Base your answers on the search results when available. Give concise answers that correctly answer what the user is asking for. Do not flood them with all the information from the search results.`,
      // System prompt to guide AI behavior
      stopWhen: stepCountIs(2), // Allow AI to perform 2 steps: search -> respond
    });

    return result.toUIMessageStreamResponse(); // Return the AI response as a stream to the frontend
  } catch (error) {
    console.log('Error streaming chat completion:', error); // Log any errors

    return new Response('Failed to stream chat completion', { status: 500 });
    // Return HTTP 500 if something goes wrong
  }
}
