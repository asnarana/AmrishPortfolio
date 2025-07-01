// Import types and libraries for server, routing, validation, file handling, and email
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js"; // custom storage module for db operations
import { 
  insertContactMessageSchema,
  insertProjectSchema,
  insertBlogPostSchema,
  insertExperienceSchema,
  insertSkillSchema
} from "../shared/schema.js"; // zod schemas for validation
import { z } from "zod"; // zod for validation
import { readFileSync } from "fs"; // fs for file handling
import { join } from "path"; // path for file handling
import nodemailer from "nodemailer"; // nodemailer for email handling

// this is the main file that registers all the routes for the server
// it is called from index.ts
// it takes an Express app as an argument and returns an HTTP server
// sets up all api enpdoints, validates incoming data with zod, handles db operations, and serves static files
// sends email notifications for contact form submissions
// serves the resume PDF for download

// Main function to register all routes and return the HTTP server
export async function registerRoutes(app: Express): Promise<Server> {
  // === CONTACT FORM ROUTES ===

  // Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate incoming data using Zod schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      // Save the message to the database (or storage)
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification via Nodemailer, this func not working though as expected( TODO: fix this)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NOTIFY_EMAIL,
          pass: process.env.NOTIFY_EMAIL_PASSWORD,
        },
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
        `,
      });

      // Log the message for debugging
      console.log("New contact message:", message);

      // Respond to the client
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        // Handle other errors
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Fetch all contact messages (admin use) to do later 
  app.get("/api/contact-messages", async (req, res) => {
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

  // === PROJECTS ROUTES ===

  // Get all projects (optionally filter for featured)
  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const projects = featured 
        ? await storage.getFeaturedProjects()
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }
  });

  // Get a single project by ID
  app.get("/api/projects/:id", async (req, res) => {
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

  // Create a new project
  app.post("/api/projects", async (req, res) => {
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

  // Update an existing project
  app.put("/api/projects/:id", async (req, res) => {
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

  // Delete a project
  app.delete("/api/projects/:id", async (req, res) => {
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

  // === BLOG POSTS ROUTES ===
  // (Similar CRUD routes for blog posts...)
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const posts = published
        ? await storage.getPublishedBlogPosts()
        : await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
    }
  });
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) return res.status(404).json({ success: false, message: "Blog post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog post" });
    }
  });
  app.post("/api/blog", async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid blog data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create blog post" });
      }
    }
  });

  app.put("/api/blog/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updates = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, updates);
      if (!post) return res.status(404).json({ success: false, message: "Blog post not found" });
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid blog data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update blog post" });
      }
    }
  });
  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) return res.status(404).json({ success: false, message: "Blog post not found" });
      res.json({ success: true, message: "Blog post deleted" });
    } catch {
      res.status(500).json({ success: false, message: "Failed to delete blog post" });
    }
  });
  // === END OF BLOG POSTS ROUTES ===

  // === EXPERIENCES ROUTES ===
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch experiences" });
    }
  });
  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const experience = await storage.getExperience(id);
      if (!experience) return res.status(404).json({ success: false, message: "Experience not found" });
      res.json(experience);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch experience" });
    }
  });
  app.post("/api/experiences", async (req, res) => {
    try {
      const data = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(data);
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid experience data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create experience" });
      }
    }
  });
  app.put("/api/experiences/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updates = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, updates);
      if (!experience) return res.status(404).json({ success: false, message: "Experience not found" });
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid experience data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update experience" });
      }
    }
  });

  // === SKILLS ROUTES ===
  // (Similar CRUD routes for skills...)
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch skills" });
    }
  });
  app.get("/api/skills/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const skill = await storage.getSkill(id);
      if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
      res.json(skill);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch skill" });
    }
  });
  app.post("/api/skills", async (req, res) => {
    try {
      const data = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(data);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid skill data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create skill" });
      }
    }
  });
  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updates = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, updates);
      if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
      res.json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid skill data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update skill" });
      }
    }
  });

  // === RESUME DOWNLOAD ROUTE ===

  // Serve the resume PDF for download
  app.get("/api/resume/download", async (req, res) => {
    try {
      // Build the path to the resume PDF
      const resumePath = join(process.cwd(), 'attached_assets', 'amrishdec25 (2)_1751297578613.pdf');
      // Read the PDF file
      const pdfContent = readFileSync(resumePath);
      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=\"Amrish-Naranappa-Resume.pdf\"');
      res.setHeader('Content-Length', pdfContent.length);
      // Send the file
      res.send(pdfContent);
    } catch (error) {
      console.error('Resume download error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to download resume" 
      });
    }
  });

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}