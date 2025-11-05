// Import specific column types and helpers from Drizzle's PostgreSQL core package
import { pgTable, serial, text, vector, index } from 'drizzle-orm/pg-core';

// Define a table named "documents" in the database
export const documents = pgTable(
  'documents',
  {
    // "id" column: auto-incrementing primary key
    id: serial('id').primaryKey(),

    // "content" column: text field, cannot be null
    content: text('content').notNull(),

    // "embedding" column: a vector type (used for AI embeddings)
    // Here we specify that each vector has 1536 dimensions
    embedding: vector('embedding', { dimensions: 1536 }),
  },
  (table) => [
    // Create an index on the "embedding" column to speed up vector searches
    // Uses the "hnsw" algorithm (Hierarchical Navigable Small World)
    // and the "vector_cosine_ops" operator for cosine similarity comparisons
    index('embeddingIndex').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops')
    ),
  ]
);

// Define TypeScript types inferred from the schema:
// "InsertDocument" is used when inserting new rows into the table
export type InsertDocument = typeof documents.$inferInsert;

// "SelectDocument" is used when reading (selecting) rows from the table
export type SelectDocument = typeof documents.$inferSelect;
