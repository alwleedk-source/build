import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  projects, InsertProject,
  services, InsertService,
  blogPosts, InsertBlogPost,
  testimonials, InsertTestimonial,
  teamMembers, InsertTeamMember,
  contactMessages, InsertContactMessage,
  mediaLibrary, InsertMedia,
  siteSettings, InsertSiteSetting
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
  const result = await db.insert(projects).values(project);
  return result;
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(project).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
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
  const result = await db.insert(services).values(service);
  return result;
}

export async function updateService(id: number, service: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(services).set(service).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(services).where(eq(services.id, id));
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
  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}


// ========== Testimonials ==========
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(testimonials.order, testimonials.createdAt);
}

export async function getTestimonialById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(testimonials).values(testimonial);
  return result;
}

export async function updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ========== Team Members ==========
export async function getAllTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(teamMembers).orderBy(teamMembers.order, teamMembers.createdAt);
}

export async function getTeamMemberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTeamMember(member: InsertTeamMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamMembers).values(member);
  return result;
}

export async function updateTeamMember(id: number, member: Partial<InsertTeamMember>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(teamMembers).set(member).where(eq(teamMembers.id, id));
}

export async function deleteTeamMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
}

// ========== Contact Messages ==========
export async function getAllMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getMessageById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactMessages).values(message);
  return result;
}

export async function updateMessageStatus(id: number, isRead: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactMessages).set({ isRead }).where(eq(contactMessages.id, id));
}

export async function deleteMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

// ========== Media Library ==========
export async function getAllMedia() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.uploadedAt));
}

export async function getMediaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(mediaLibrary).where(eq(mediaLibrary.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMedia(media: InsertMedia) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(mediaLibrary).values(media);
  return result;
}

export async function deleteMedia(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}

// ========== Site Settings ==========
export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(siteSettings);
}

export async function getSettingByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertSetting(key: string, value: string, type: "text" | "number" | "boolean" | "json" | "image" = "text") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteSettings).values({ key, value, type }).onDuplicateKeyUpdate({
    set: { value, type, updatedAt: new Date() },
  });
}

export async function deleteSetting(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(siteSettings).where(eq(siteSettings.id, id));
}
