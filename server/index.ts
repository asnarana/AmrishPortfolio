// import express and its types for Request, Response, and NextFunction
import express, { type Request, Response, NextFunction } from "express";
// import custom route registration function from routes.ts
import { registerRoutes } from "./routes.js";
// import vite.js for setting up vite and serving static files
import { setupVite, serveStatic, log } from "./vite.js";
//import cors for cross-origin resource sharing
import cors from "cors";


const app = express();
//allows requests from the frontend( github pages domain)
app.use(cors({
  origin: "https://asnarana.github.io",
  credentials: true,
}));
// middleware to parse incoming JSON payloads
app.use(express.json());
// middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: false }));

import dotenv from "dotenv";
dotenv.config({ path: new URL('./.env', import.meta.url) });// custom logging middleware; captures req start time, path, and response status code
// and logs it to the console
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  //   // Monkey-patch res.json to capture JSON before sending
  //   // this is a technique to modify the behavior of a function at runtime
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
//when response finishes, log the request details
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next(); 
});
// register all the routes
// immediately invoke the async function to register routes and start the server
(async () => {
  const server = await registerRoutes(app);
  // centralized error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  // in dev, mount Vite middlewree for hotreloading the frontend , in production, serve the built static files
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  //setting up the port and host( for host, if not specified, it will default to localhost)
  const port = parseInt(process.env.PORT || '5000');
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
  
  server.listen(port, host, () => {
    log(`serving on port ${port}`);
  });
})();
