import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
// Import necessary functions from Drizzle ORM:
// - cosineDistance: calculates how dissimilar two vectors are
// - desc: for ordering results in descending order
// - gt: "greater than" operator for filtering
// - sql: allows embedding raw SQL expressions in queries

import { db } from './db-config';
// Import the database connection object

import { documents } from './db-schema';
// Import the schema for the 'documents' table (id, content, embedding, etc.)

import { generateEmbedding } from './embeddings';
// Import the function that converts text into an embedding (vector)

export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5
) {
  // Export an async function to search documents semantically
  // Parameters:
  // - query: the user's search text
  // - limit: how many results to return (default 5)
  // - threshold: minimum similarity score to include a document (default 0.5)

  const embedding = await generateEmbedding(query);
  // Generate an embedding (vector) for the user's query

  const similarity = sql<number>`1 - (${cosineDistance(
    documents.embedding,
    embedding
  )})`;
  // Calculate similarity between each document's embedding and the query embedding
  // cosineDistance returns dissimilarity (0 = identical, 1 = completely different)
  // Subtract from 1 to get similarity (1 = identical, 0 = no similarity)

  const similarDocuments = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    // Select document id, content, and the calculated similarity score

    .from(documents)
    // Specify the table to query from

    .where(gt(similarity, threshold))
    // Filter only documents where similarity is greater than the threshold

    .orderBy(desc(similarity))
    // Order the results from highest similarity to lowest

    .limit(limit);
  // Limit the number of returned documents to the 'limit' parameter

  return similarDocuments;
  // Return the list of most similar documents
}
