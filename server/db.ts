import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  InsertUser, users,
  projects, InsertProject,
  services, InsertService,
  blogPosts, InsertBlogPost,
  partners, InsertPartner,
  testimonials, InsertTestimonial,
  siteSettings,
  contactMessages, InsertContactMessage,
  emailSettings, InsertEmailSettings
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL, { prepare: false });
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    for (const field of textFields) {
      if (user[field] !== undefined) {
        values[field] = user[field];
        updateSet[field] = user[field];
      }
    }

    await db
      .insert(users)
      .values(values)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0] || null;
}

// Projects
export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getFeaturedProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).where(eq(projects.featured, 1)).orderBy(desc(projects.createdAt));
}

export async function getHomepageProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).orderBy(desc(projects.createdAt)).limit(6);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] || null;
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(project).returning();
  return result[0];
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
  return result[0];
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
}

// Services
export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).orderBy(desc(services.createdAt));
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result[0] || null;
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(services).values(service).returning();
  return result[0];
}

export async function updateService(id: number, service: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
  return result[0];
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
}

// Blog Posts
export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0] || null;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(blogPosts).values(post).returning();
  return result[0];
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
  return result[0];
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// Partners
export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(partners).orderBy(desc(partners.createdAt));
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  return result[0] || null;
}

export async function createPartner(partner: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(partners).values(partner).returning();
  return result[0];
}

export async function updatePartner(id: number, partner: Partial<InsertPartner>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(partners).set(partner).where(eq(partners.id, id)).returning();
  return result[0];
}

export async function deletePartner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(partners).where(eq(partners.id, id));
}

// Testimonials
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getTestimonialById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return result[0] || null;
}

export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(testimonials).values(testimonial).returning();
  return result[0];
}

export async function updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id)).returning();
  return result[0];
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// Site Settings
export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteSettings).limit(1);
  return result[0] || null;
}

export async function updateSiteSettings(settings: Partial<typeof siteSettings.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSiteSettings();
  if (existing) {
    const result = await db.update(siteSettings).set(settings).where(eq(siteSettings.id, existing.id)).returning();
    return result[0];
  } else {
    const result = await db.insert(siteSettings).values(settings as any).returning();
    return result[0];
  }
}

// Contact Messages
export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getContactMessageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return result[0] || null;
}

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactMessages).values(message).returning();
  return result[0];
}

export async function markMessageAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(contactMessages).set({ isRead: 1 }).where(eq(contactMessages.id, id)).returning();
  return result[0];
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

// Email Settings
export async function getEmailSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(emailSettings).limit(1);
  return result[0] || null;
}

export async function updateEmailSettings(settings: Partial<InsertEmailSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getEmailSettings();
  if (existing) {
    const result = await db.update(emailSettings).set(settings).where(eq(emailSettings.id, existing.id)).returning();
    return result[0];
  } else {
    const result = await db.insert(emailSettings).values(settings as InsertEmailSettings).returning();
    return result[0];
  }
}
