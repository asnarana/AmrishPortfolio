import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema,
  insertProjectSchema,
  insertBlogPostSchema,
  insertExperienceSchema,
  insertSkillSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // In a real application, you would send an email here
      // For now, we'll just log the message
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

  // Get contact messages (for admin purposes)
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
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published === 'true';
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
      if (!post) {
        return res.status(404).json({ success: false, message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
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

  app.put("/api/blog/:id", async (req, res) => {
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

  app.delete("/api/blog/:id", async (req, res) => {
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

  // === EXPERIENCES ROUTES ===
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experiences", async (req, res) => {
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

  app.put("/api/experiences/:id", async (req, res) => {
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

  app.delete("/api/experiences/:id", async (req, res) => {
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

  // === SKILLS ROUTES ===
  app.get("/api/skills", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const skills = featured 
        ? await storage.getFeaturedSkills()
        : await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
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

  app.put("/api/skills/:id", async (req, res) => {
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

  app.delete("/api/skills/:id", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
