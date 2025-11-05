// Import the `drizzle` function from Drizzle ORM's Neon HTTP adapter.
// This allows us to use Drizzle with Neon’s serverless PostgreSQL driver.
import { drizzle } from 'drizzle-orm/neon-http';

// Import the Neon database client for serverless connections to PostgreSQL.
import { neon } from '@neondatabase/serverless';

// Import the `config` function from the dotenv package to load environment variables.
import { config } from 'dotenv';

// Load environment variables from the `.env.local` file into `process.env`.
config({ path: '.env.local' });

// Create a connection to the Neon PostgreSQL database.
// The connection string is stored in the environment variable `NODE_DATABASE_URL`.
// The exclamation mark `!` tells TypeScript we’re sure this variable exists.
const sql = neon(process.env.NEON_DATABASE_URL!);

// Initialize the Drizzle ORM using the Neon SQL client.
// `db` will be our main database instance used to run queries and migrations.
export const db = drizzle(sql);
