// Import the `config` function from the `dotenv` package
// to load environment variables from a file (like `.env.local`).
import { config } from 'dotenv';

// Import the `defineConfig` helper from Drizzle Kit.
// This function is used to define and export the database configuration
// for running migrations and generating schemas.
import { defineConfig } from 'drizzle-kit';

// Load environment variables from the `.env.local` file
// so that `process.env.NEON_DATABASE_URL` becomes available.
config({ path: '.env.local' });

// Export the Drizzle configuration as the default export.
// This configuration is used by the Drizzle CLI to handle database migrations.
export default defineConfig({
  // Path to the database schema file that defines your tables and models.
  schema: './src/lib/db-schema.ts',

  // Directory where migration files will be generated and stored.
  out: './migrations',

  // Specify the database dialect — here we’re using PostgreSQL (Neon uses Postgres).
  dialect: 'postgresql',

  // Provide database connection credentials.
  // The URL is loaded from the environment variables.
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!, // The "!" tells TypeScript we’re sure this variable exists.
  },
});
