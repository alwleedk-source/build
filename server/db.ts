import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
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

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
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

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ========== Projects ==========
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
  return await db.select().from(projects).where(eq(projects.showOnHomepage, 1)).orderBy(projects.order).limit(6);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(projects).values(project);
  return { success: true };
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(project).where(eq(projects.id, id));
  return { success: true };
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
}

export async function updateProjectsOrder(items: { id: number; order: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Update each project's order
  for (const item of items) {
    await db.update(projects).set({ order: item.order }).where(eq(projects.id, item.id));
  }
}

// ========== Services ==========
export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).orderBy(desc(services.createdAt));
}

export async function getHomepageServices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).where(eq(services.showOnHomepage, 1)).orderBy(desc(services.createdAt));
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(services).values(service);
  return { success: true };
}

export async function updateService(id: number, service: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(services).set(service).where(eq(services.id, id));
  return { success: true };
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
}

export async function updateServicesOrder(items: { id: number; order: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Update each service's order
  for (const item of items) {
    await db.update(services).set({ order: item.order }).where(eq(services.id, item.id));
  }
}

// ========== Blog Posts ==========
export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
  return { success: true };
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
  return { success: true };
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ========== Partners ==========
export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(partners).orderBy(partners.order);
}

export async function getActivePartners() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(partners).where(eq(partners.isActive, 1)).orderBy(partners.order);
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPartner(partner: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(partners).values(partner);
  return { success: true };
}

export async function updatePartner(id: number, partner: Partial<InsertPartner>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners).set(partner).where(eq(partners.id, id));
  return { success: true };
}

export async function deletePartner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(partners).where(eq(partners.id, id));
}

export async function updatePartnersOrder(items: { id: number; order: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Update each partner's order
  for (const item of items) {
    await db.update(partners).set({ order: item.order }).where(eq(partners.id, item.id));
  }
}


// ========== Site Settings ==========
export async function getAllSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(siteSettings);
}

export async function getSiteSettingByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertSiteSetting(setting: { key: string; value: string; type?: "text" | "boolean" | "number" | "json" | "image" }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if setting exists
  const existing = await getSiteSettingByKey(setting.key);
  
  if (existing) {
    // Update existing setting
    await db.update(siteSettings).set({ value: setting.value }).where(eq(siteSettings.key, setting.key));
  } else {
    // Insert new setting
    await db.insert(siteSettings).values({
      key: setting.key,
      value: setting.value,
      type: (setting.type || 'text') as "text" | "boolean" | "number" | "json" | "image",
    });
  }
  
  return { success: true };
}


// ========== Testimonials Functions ==========

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(testimonials.order);
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(data);
  return { success: true };
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
  return { success: true };
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

export async function updateTestimonialsOrder(updates: { id: number; order: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  for (const update of updates) {
    await db.update(testimonials)
      .set({ order: update.order })
      .where(eq(testimonials.id, update.id));
  }
}


// ========== Contact Messages Functions ==========

export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getUnreadContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages)
    .where(eq(contactMessages.isRead, 0))
    .orderBy(desc(contactMessages.createdAt));
}

export async function getContactMessageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
  return result[0] || null;
}

export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactMessages).values(data);
  // @ts-ignore - insertId exists but not in type definition
  return { success: true, id: Number(result.insertId) || 0 };
}

export async function markContactMessageAsRead(id: number, isRead: number = 1) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactMessages).set({ isRead }).where(eq(contactMessages.id, id));
  return { success: true };
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  return { success: true };
}


// ========== Email Settings Functions ==========

export async function getEmailSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(emailSettings);
  return result[0] || null;
}

export async function upsertEmailSettings(data: InsertEmailSettings) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getEmailSettings();
  
  if (existing) {
    await db.update(emailSettings)
      .set(data)
      .where(eq(emailSettings.id, existing.id));
  } else {
    await db.insert(emailSettings).values(data);
  }
  
  return { success: true };
}
