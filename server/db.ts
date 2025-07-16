import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
//had to change from render to neon because render was not working

// Import ws (WebSocket) library, required for Neon serverless connections
import ws from "ws";

//  all schema definitions 
import * as schema from "../shared/schema.js";

//  dotenv to load environment variables from a .env file
import dotenv from "dotenv";

//  environment variables into process.env
dotenv.config({ path: new URL('./.env', import.meta.url) });
// Tell Neon to use the ws (WebSocket) constructor for serverless connections
neonConfig.webSocketConstructor = ws;

//  DATABASE_URL environment variable is set, otherwise throw an error
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// new PostgreSQL connection pool using the DATABASE_URL from environment variables
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });