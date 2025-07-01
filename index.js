var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  contactMessages: () => contactMessages,
  experiences: () => experiences,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertExperienceSchema: () => insertExperienceSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSkillSchema: () => insertSkillSchema,
  insertUserSchema: () => insertUserSchema,
  projects: () => projects,
  skills: () => skills,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  technologies: text("technologies").array().notNull(),
  category: text("category").array().notNull(),
  achievements: text("achievements").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  tags: text("tags").array().notNull(),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  description: text("description").array().notNull(),
  technologies: text("technologies").array().notNull(),
  current: boolean("current").default(false),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import dotenv from "dotenv";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // Users
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Contact Messages
  async createContactMessage(insertMessage) {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  async getContactMessages() {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  // Projects
  async createProject(insertProject) {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  async getProjects() {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }
  async getFeaturedProjects() {
    return await db.select().from(projects).where(eq(projects.featured, true)).orderBy(desc(projects.createdAt));
  }
  async getProject(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || void 0;
  }
  async updateProject(id, updates) {
    const [project] = await db.update(projects).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(projects.id, id)).returning();
    return project || void 0;
  }
  async deleteProject(id) {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Blog Posts
  async createBlogPost(insertPost) {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }
  async getBlogPosts() {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }
  async getPublishedBlogPosts() {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
  }
  async getBlogPost(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || void 0;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async updateBlogPost(id, updates) {
    const [post] = await db.update(blogPosts).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(blogPosts.id, id)).returning();
    return post || void 0;
  }
  async deleteBlogPost(id) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Experiences
  async createExperience(insertExperience) {
    const [experience] = await db.insert(experiences).values(insertExperience).returning();
    return experience;
  }
  async getExperiences() {
    return await db.select().from(experiences).orderBy(desc(experiences.startDate));
  }
  async getExperience(id) {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || void 0;
  }
  async updateExperience(id, updates) {
    const [experience] = await db.update(experiences).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(experiences.id, id)).returning();
    return experience || void 0;
  }
  async deleteExperience(id) {
    const result = await db.delete(experiences).where(eq(experiences.id, id));
    return (result.rowCount || 0) > 0;
  }
  // Skills
  async createSkill(insertSkill) {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }
  async getSkills() {
    return await db.select().from(skills).orderBy(desc(skills.level));
  }
  async getFeaturedSkills() {
    return await db.select().from(skills).where(eq(skills.featured, true)).orderBy(desc(skills.level));
  }
  async getSkill(id) {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill || void 0;
  }
  async updateSkill(id, updates) {
    const [skill] = await db.update(skills).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(skills.id, id)).returning();
    return skill || void 0;
  }
  async deleteSkill(id) {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return (result.rowCount || 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";
import nodemailer from "nodemailer";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      console.log("New contact message:", message);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message"
        });
      }
    }
  });
  app2.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch messages"
      });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const projects2 = featured ? await storage.getFeaturedProjects() : await storage.getProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch project" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create project" });
      }
    }
  });
  app2.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update project" });
      }
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete project" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const posts = published ? await storage.getPublishedBlogPosts() : await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ success: false, message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid blog post data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create blog post" });
      }
    }
  });
  app2.put("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (!post) {
        return res.status(404).json({ success: false, message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid blog post data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update blog post" });
      }
    }
  });
  app2.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Blog post not found" });
      }
      res.json({ success: true, message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete blog post" });
    }
  });
  app2.get("/api/experiences", async (req, res) => {
    try {
      const experiences2 = await storage.getExperiences();
      res.json(experiences2);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch experiences" });
    }
  });
  app2.post("/api/experiences", async (req, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid experience data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create experience" });
      }
    }
  });
  app2.put("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, validatedData);
      if (!experience) {
        return res.status(404).json({ success: false, message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid experience data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update experience" });
      }
    }
  });
  app2.delete("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Experience not found" });
      }
      res.json({ success: true, message: "Experience deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete experience" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const skills2 = featured ? await storage.getFeaturedSkills() : await storage.getSkills();
      res.json(skills2);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch skills" });
    }
  });
  app2.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid skill data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create skill" });
      }
    }
  });
  app2.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, validatedData);
      if (!skill) {
        return res.status(404).json({ success: false, message: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid skill data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update skill" });
      }
    }
  });
  app2.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSkill(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Skill not found" });
      }
      res.json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete skill" });
    }
  });
  app2.get("/api/resume/download", async (req, res) => {
    try {
      const resumePath = join(process.cwd(), "attached_assets", "amrishdec25 (2)_1751297578613.pdf");
      const pdfContent = readFileSync(resumePath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Amrish-Naranappa-Resume.pdf"');
      res.setHeader("Content-Length", pdfContent.length);
      res.send(pdfContent);
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to download resume"
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NOTIFY_EMAIL,
          pass: process.env.NOTIFY_EMAIL_PASSWORD
        }
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL_TO,
        subject: `New Contact Form Submission from ${validatedData.name}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          Message: ${validatedData.message}
        `
      });
      console.log("New contact message:", message);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message"
        });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/AmrishPortfolio",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: { ...viteLogger, error: (msg, options) => {
      viteLogger.error(msg, options);
      process.exit(1);
    } },
    server: { middlewareMode: true, hmr: { server } },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import dotenv2 from "dotenv";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
dotenv2.config();
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "localhost", () => {
    log(`serving on port ${port}`);
  });
})();
