import { embed, embedMany } from 'ai'; // Import functions to generate embeddings from AI SDK
import { openai } from '@ai-sdk/openai'; // Import the OpenAI provider

// Single embedding function for one text (e.g., a user's search query)
export async function generateEmbedding(text: string): Promise<number[]> {
  // Clean the text: replace all newline characters with spaces
  const input = text.replaceAll('\n', ' ');

  // Call the embed function with the OpenAI model
  const { embedding } = await embed({
    model: openai.textEmbeddingModel('text-embedding-3-small'), // Specify embedding model
    value: input, // Pass the cleaned text
  });

  // Return the embedding vector (array of numbers)
  return embedding;
}

// Batch embedding function for multiple texts (e.g., PDF chunks)
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  // Clean all texts by replacing newlines with spaces
  const inputs = texts.map((text) => text.replaceAll('\n', ' '));

  // Call embedMany to generate embeddings for all texts at once
  const { embeddings } = await embedMany({
    model: openai.textEmbeddingModel('text-embedding-3-small'), // Same model as single
    values: inputs, // Pass the array of cleaned texts
  });

  // Return an array of embedding vectors (one per text)
  return embeddings;
}
