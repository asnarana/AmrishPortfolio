import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  //when deployed to github pages, the base path is /AmrishPortfolio so that `https://asnarana.github.io/AmrishPortfolio/index.html` can find them. 
  // setting base as this, allows vite to generate asset links and routing that works correctly on that subpath
  //when running locally, the base path is /( local host), index.html is the main entry point of the app
  // index.html is in the root directory of the project, and has the <div id="root"></div> where my app gets injected 
  // this will load by js and css files in the dist folder


  base: "/AmrishPortfolio",
  plugins: [
    //react plugin - fast refresh and jsx support 
    react(),
    // runtimeErrorOverlay(),
    // ...(process.env.NODE_ENV !== "production" &&
    // process.env.REPL_ID !== undefined
    //   ? [
    //       await import("@replit/vite-plugin-cartographer").then((m) =>
    //         m.cartographer(),
    //       ),
    //     ]
    //   : []),
  ],
  resolve: {
    //simpify import paths 
    alias: {
      // @ is the alias for the client/src directory
      "@": path.resolve(import.meta.dirname, "client", "src"),
      // @shared is the alias for the shared directory
      "@shared": path.resolve(import.meta.dirname, "shared"),
      // @assets is the alias for the attached_assets directory 
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // the root directory of the project is the client directory( my SPA entry point)
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    //output directory for the build, will produce dist/index.html under dist/
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    //restrict file serving to project files only
    fs: {
      strict: true,
      //disallow serving "dotfiles" like .env and .gitignore  
      deny: ["**/.*"],
    },
  },
});
