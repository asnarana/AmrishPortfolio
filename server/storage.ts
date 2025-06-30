import { 
  users, 
  contactMessages, 
  projects, 
  blogPosts, 
  experiences, 
  skills,
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage,
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Projects
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Blog Posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Experiences
  createExperience(experience: InsertExperience): Promise<Experience>;
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Skills
  createSkill(skill: InsertSkill): Promise<Skill>;
  getSkills(): Promise<Skill[]>;
  getFeaturedSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
}

import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  // Projects
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Blog Posts
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Experiences
  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [experience] = await db
      .insert(experiences)
      .values(insertExperience)
      .returning();
    return experience;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db
      .select()
      .from(experiences)
      .orderBy(desc(experiences.startDate));
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || undefined;
  }

  async updateExperience(id: number, updates: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [experience] = await db
      .update(experiences)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(experiences.id, id))
      .returning();
    return experience || undefined;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experiences).where(eq(experiences.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Skills
  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values(insertSkill)
      .returning();
    return skill;
  }

  async getSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .orderBy(desc(skills.level));
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.featured, true))
      .orderBy(desc(skills.level));
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill || undefined;
  }

  async updateSkill(id: number, updates: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [skill] = await db
      .update(skills)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return skill || undefined;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();
