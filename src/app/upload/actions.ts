'use server';
// Marks this file as a Server Action in Next.js.
// This code runs only on the server, not in the browser.
// Allows usage of Node.js APIs like Buffer and database access.

// const pdf = require('pdf-parse');
import pdf from 'pdf-parse';
// Import the 'pdf-parse' library to extract text from PDF files.

import { db } from '@/lib/db-config';
// Import the database connection instance to interact with our database.

import { documents } from '@/lib/db-schema';
// Import the schema for the 'documents' table to know the structure of records.

import { generateEmbeddings } from '@/lib/embeddings';
// Import a utility function to generate embeddings (vector representations) for text chunks.

import { chunkContent } from '@/lib/chunking';
// Import a utility function to split long text into smaller chunks for processing.

export async function processPdfFile(formData: FormData) {
  // Define an async function that takes FormData (from an upload form) as input.
  // This function will process the PDF and store chunks + embeddings in the database.

  try {
    const file = formData.get('pdf') as File;
    // Extract the uploaded file from the FormData using the key 'pdf'.
    // Type assertion 'as File' tells TypeScript this is a File object.

    const bytes = await file.arrayBuffer();
    // Convert the File to an ArrayBuffer (binary representation) from the browser.

    const buffer = Buffer.from(bytes);
    // Convert the ArrayBuffer to a Node.js Buffer.
    // 'pdf-parse' requires a Node Buffer to read the PDF contents.

    const data = await pdf(buffer);
    // Use pdf-parse to extract text from the PDF buffer.
    // 'data.text' will contain the extracted text.

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: 'No text found in PDF',
      };
    }
    // Check if any text was extracted.
    // If the PDF is empty or contains only images, return an error.

    const chunks = await chunkContent(data.text);
    // Split the extracted text into smaller chunks using our utility function.
    // Each chunk will later get its own embedding.

    const embeddings = await generateEmbeddings(chunks);
    // Generate vector embeddings for each text chunk.
    // Embeddings allow semantic search and AI processing.

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));
    // Create an array of objects where each chunk is paired with its corresponding embedding.
    // The index ensures each chunk matches the correct embedding.

    await db.insert(documents).values(records);
    // Insert all chunks with their embeddings into the 'documents' table in the database.
    // Now the text is searchable by embeddings.

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
    // Return a success response with the number of chunks stored.
  } catch (error) {
    console.error('PDF processing error', error);
    // Log any errors that occur during processing.

    return {
      success: false,
      error: 'Failed to process PDF',
    };
    // Return a failure response if something goes wrong.
  }
}
