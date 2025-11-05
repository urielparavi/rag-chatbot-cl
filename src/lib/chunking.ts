// Import the RecursiveCharacterTextSplitter from LangChain,
// a utility for splitting long text into smaller overlapping chunks.
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// Create a text splitter instance with specific configuration options.
export const textSplitter = new RecursiveCharacterTextSplitter({
  // Each chunk will contain approximately 150 characters.
  // In production, this number is usually higher (e.g., 500–1000).
  chunkSize: 150,

  // Adjacent chunks will overlap by 20 characters to preserve context
  // between consecutive pieces of text (so meaning isn’t lost at boundaries).
  chunkOverlap: 20,

  // Split text based on spaces to avoid breaking words in half.
  separators: [' '],
});

// Define an asynchronous function that splits input text into chunks.
export async function chunkContent(content: string) {
  // Remove leading and trailing whitespace from the input text,
  // then use the text splitter to break it into smaller chunks.
  return await textSplitter.splitText(content.trim());
}
