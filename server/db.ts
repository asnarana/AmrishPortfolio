// Import Pool and neonConfig for connecting to Neon serverless PostgreSQL
import { Pool, neonConfig } from '@neondatabase/serverless';

// Import Drizzle ORM's Neon adapter for type-safe database access
import { drizzle } from 'drizzle-orm/neon-serverless';

// Import ws (WebSocket) library, required for Neon serverless connections
import ws from "ws";

// Import all schema definitions (tables, types, etc.) from the shared schema file
import * as schema from "../shared/schema.js";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables into process.env
dotenv.config();

// Tell Neon to use the ws (WebSocket) constructor for serverless connections
neonConfig.webSocketConstructor = ws;

// Ensure the DATABASE_URL environment variable is set, otherwise throw an error
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a new PostgreSQL connection pool using the DATABASE_URL from environment variables
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a Drizzle ORM database instance using the Neon pool and your schema
export const db = drizzle(pool, { schema });