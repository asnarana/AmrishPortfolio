// Import Express types for typing, and the Express app itself
import express, { type Express } from "express";
// Import Node.js file system and path modules
import fs from "fs";
import path from "path";
// Import Vite's server creation and logger utilities
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config.js";
import { nanoid } from "nanoid";

// Create a Vite logger instance for consistent logging
const viteLogger = createLogger();

// sets up Vite as middlwere for dev and as static file server for production
// ensures my app works with cleint-side routing and always serves the correct index.html
// It provides robust logging and error handling for both development and production.

/**
 * Log messages with a timestamp and source label.
 * @param message - The message to log
 * @param source - The source of the log (default: 'express')
 */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  

  console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * Set up Vite in middleware mode for development.
 * This allows Vite to handle frontend assets and HMR (hot module replacement)
 * while Express handles API and other routes.
 * serves my app directly from soruce files so changes appear instantly wo rebuilding 
 * @param app - The Express app instance
 * @param server - The HTTP server instance (for HMR)
 */
export async function setupVite(app: Express, server: Server) {
  // const serverOptions = {
  //   middlewareMode: true,
  //   hmr: { server },
  //   allowedHosts: true,
  // };

  // const vite = await createViteServer({
  //   ...viteConfig,
  //   configFile: false,
  //   customLogger: {
  //     ...viteLogger,
  //     error: (msg, options) => {
  //       viteLogger.error(msg, options);
  //       process.exit(1);
  //     },
  //   },
  //   server: serverOptions,
  //   appType: "custom",
  // });
  // create a Vite dev server in middleware mode, with custom error handling
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false, // says dont look for a vite.config.ts file
    customLogger: { ...viteLogger, error: (msg, options) => { viteLogger.error(msg, options); process.exit(1); }, }, // custom logger for vite
    server: { middlewareMode: true, hmr: { server }}, 
    appType: "custom", 
  });
  // app uses vites middlewares to handle frontend requests 
  app.use(vite.middlewares);
    // Catch-all route: serve the index.html for any unmatched route (for SPA routing)
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // resolve the path to the index.html file 
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html", 
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      // Add a cache-busting query string to the main entry point
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      // let vite transform the index.html file to include the correct asset links and HMR code
      const page = await vite.transformIndexHtml(url, template);
      // send the transformed index.html to the client
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
      // if there is an error, vite will fix the stack trace and pass it to the next middleware
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Serve static files from the production build (for production mode).
 * No HMR or live reload—just fast, static file serving.
Handles all frontend routes by always returning index.html for unknown routes (for SPA routing).
 * @param app - The Express app instance
 */
export function serveStatic(app: Express) {
  //  the path to the production build output (client/dist directory)
  const distPath = path.resolve(import.meta.dirname, "..", "client", "dist");

  // If the build directory doesn't exist, throw an error
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }
  //  static files from the build directory
  app.use(express.static(distPath));
  // fallback: serve index.html for any unmatched route 
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
