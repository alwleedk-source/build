import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Enums for projects
export const categoryEnum = pgEnum("category", ["Residentieel", "Commercieel", "Industrieel"]);

// Projects table
export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionEn: text("descriptionEn"),
  content: text("content"), // Detailed project content
  contentEn: text("contentEn"),
  category: categoryEnum("category").notNull(),
  image: varchar("image", { length: 500 }).notNull(), // Main image
  images: text("images"), // JSON array of additional images
  featured: integer("featured").default(0).notNull(), // 0 = false, 1 = true
  showOnHomepage: integer("showOnHomepage").default(0).notNull(), // 0 = false, 1 = true
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Services table
export const services = pgTable("services", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionEn: text("descriptionEn"),
  longDescription: text("longDescription").notNull(),
  longDescriptionEn: text("longDescriptionEn"),
  icon: varchar("icon", { length: 50 }).notNull(), // Icon name from lucide-react
  image: varchar("image", { length: 500 }), // Service image URL
  features: text("features").notNull(), // JSON array of features
  featuresEn: text("featuresEn"), // JSON array of features in English
  showOnHomepage: integer("showOnHomepage").default(0).notNull(), // 0 = false, 1 = true
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Blog Posts table
export const blogPosts = pgTable("blogPosts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  excerptEn: text("excerptEn"),
  content: text("content").notNull(),
  contentEn: text("contentEn"),
  image: varchar("image", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  categoryEn: varchar("categoryEn", { length: 100 }),
  authorId: integer("authorId").notNull(),
  published: boolean("published").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  positionEn: varchar("positionEn", { length: 255 }),
  company: varchar("company", { length: 255 }),
  companyEn: varchar("companyEn", { length: 255 }),
  content: text("content").notNull(),
  contentEn: text("contentEn"),
  rating: integer("rating").default(5).notNull(), // 1-5 stars
  image: varchar("image", { length: 500 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Team Members table
export const teamMembers = pgTable("teamMembers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  positionEn: varchar("positionEn", { length: 255 }),
  bio: text("bio"),
  bioEn: text("bioEn"),
  image: varchar("image", { length: 500 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

// Enum for site settings type
export const settingTypeEnum = pgEnum("setting_type", ["text", "number", "boolean", "json", "image"]);

// Site Settings table
export const siteSettings = pgTable("siteSettings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  type: settingTypeEnum("type").default("text").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

// Homepage Sections table
export const homepageSections = pgTable("homepageSections", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull().unique(), // hero, services, projects, testimonials, contact
  isVisible: integer("isVisible").default(1).notNull(), // 0 = hidden, 1 = visible
  order: integer("order").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type HomepageSection = typeof homepageSections.$inferSelect;
export type InsertHomepageSection = typeof homepageSections.$inferInsert;

// Contact Messages table
export const contactMessages = pgTable("contactMessages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  isRead: integer("isRead").default(0).notNull(), // 0 = unread, 1 = read
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  messageHash: varchar("messageHash", { length: 64 }), // SHA-256 hash for duplicate detection
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Enum for media type
export const mediaTypeEnum = pgEnum("media_type", ["image", "video", "document"]);

// Media Library table
export const mediaLibrary = pgTable("mediaLibrary", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  type: mediaTypeEnum("type").default("image").notNull(),
  category: varchar("category", { length: 100 }), // projects, services, blog, team, general
  size: integer("size"), // file size in bytes
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type Media = typeof mediaLibrary.$inferSelect;
export type InsertMedia = typeof mediaLibrary.$inferInsert;

// Partners table
export const partners = pgTable("partners", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 500 }).notNull(),
  url: varchar("url", { length: 500 }),
  isActive: integer("isActive").default(1).notNull(), // 0 = inactive, 1 = active
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

// Email Settings table
export const emailSettings = pgTable("emailSettings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  smtpHost: varchar("smtpHost", { length: 255 }),
  smtpPort: integer("smtpPort"),
  smtpUser: varchar("smtpUser", { length: 320 }),
  smtpPassword: varchar("smtpPassword", { length: 500 }),
  fromEmail: varchar("fromEmail", { length: 320 }),
  fromName: varchar("fromName", { length: 255 }),
  autoReplyEnabled: integer("autoReplyEnabled").default(0).notNull(), // 0 = disabled, 1 = enabled
  autoReplySubject: varchar("autoReplySubject", { length: 255 }).default("Bedankt voor uw bericht").notNull(),
  autoReplyMessage: text("autoReplyMessage"),
  notificationEnabled: integer("notificationEnabled").default(0).notNull(), // 0 = disabled, 1 = enabled
  notificationEmail: varchar("notificationEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type EmailSettings = typeof emailSettings.$inferSelect;
export type InsertEmailSettings = typeof emailSettings.$inferInsert;

// Enum for admin role
export const adminRoleEnum = pgEnum("admin_role", ["admin", "super_admin"]);

// Admins table - for email/password authentication
export const admins = pgTable("admins", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: adminRoleEnum("role").default("admin").notNull(),
  isActive: integer("isActive").default(1).notNull(), // 0 = inactive, 1 = active
  lastLoginAt: timestamp("lastLoginAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = typeof admins.$inferInsert;

// Password reset tokens table
export const passwordResetTokens = pgTable("passwordResetTokens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  adminId: integer("adminId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: integer("used").default(0).notNull(), // 0 = not used, 1 = used
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert;

// About Us table - for dynamic About Us content
export const aboutUs = pgTable("aboutUs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  subtitle: varchar("subtitle", { length: 500 }),
  subtitleEn: varchar("subtitleEn", { length: 500 }),
  description: text("description").notNull(),
  descriptionEn: text("descriptionEn"),
  mission: text("mission"),
  missionEn: text("missionEn"),
  vision: text("vision"),
  visionEn: text("visionEn"),
  values: text("values"), // JSON array
  valuesEn: text("valuesEn"), // JSON array
  yearsExperience: integer("yearsExperience").default(0),
  projectsCompleted: integer("projectsCompleted").default(0),
  happyClients: integer("happyClients").default(0),
  teamMembers: integer("teamMembers").default(0),
  image: varchar("image", { length: 500 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type AboutUs = typeof aboutUs.$inferSelect;
export type InsertAboutUs = typeof aboutUs.$inferInsert;

// Hero Section Styles Enum
export const heroStyleEnum = pgEnum("hero_style", ["classic", "split", "minimal", "fullBackground", "videoBackground"]);

// Hero Section table - for dynamic Hero Section content
export const heroSection = pgTable("heroSection", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  style: heroStyleEnum("style").default("classic").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  subtitle: varchar("subtitle", { length: 500 }),
  subtitleEn: varchar("subtitleEn", { length: 500 }),
  description: text("description"),
  descriptionEn: text("descriptionEn"),
  backgroundImage: varchar("backgroundImage", { length: 500 }),
  videoUrl: varchar("videoUrl", { length: 500 }), // For video background style
  overlayOpacity: integer("overlayOpacity").default(50), // 0-100
  textAlignment: varchar("textAlignment", { length: 20 }).default("center"), // left, center, right
  primaryButtonText: varchar("primaryButtonText", { length: 100 }),
  primaryButtonTextEn: varchar("primaryButtonTextEn", { length: 100 }),
  primaryButtonLink: varchar("primaryButtonLink", { length: 500 }),
  secondaryButtonText: varchar("secondaryButtonText", { length: 100 }),
  secondaryButtonTextEn: varchar("secondaryButtonTextEn", { length: 100 }),
  secondaryButtonLink: varchar("secondaryButtonLink", { length: 500 }),
  showStats: integer("showStats").default(1).notNull(), // 0 = hidden, 1 = visible
  stat1Value: integer("stat1Value").default(0),
  stat1Label: varchar("stat1Label", { length: 100 }),
  stat1LabelEn: varchar("stat1LabelEn", { length: 100 }),
  stat2Value: integer("stat2Value").default(0),
  stat2Label: varchar("stat2Label", { length: 100 }),
  stat2LabelEn: varchar("stat2LabelEn", { length: 100 }),
  stat3Value: integer("stat3Value").default(0),
  stat3Label: varchar("stat3Label", { length: 100 }),
  stat3LabelEn: varchar("stat3LabelEn", { length: 100 }),
  stat4Value: integer("stat4Value").default(0),
  stat4Label: varchar("stat4Label", { length: 100 }),
  stat4LabelEn: varchar("stat4LabelEn", { length: 100 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type HeroSection = typeof heroSection.$inferSelect;
export type InsertHeroSection = typeof heroSection.$inferInsert;

// Footer Settings table - for dynamic Footer content
export const footerSettings = pgTable("footerSettings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  description: text("description"),
  descriptionEn: text("descriptionEn"),
  address: text("address"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 320 }),
  facebookUrl: varchar("facebookUrl", { length: 500 }),
  twitterUrl: varchar("twitterUrl", { length: 500 }),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  instagramUrl: varchar("instagramUrl", { length: 500 }),
  youtubeUrl: varchar("youtubeUrl", { length: 500 }),
  copyrightText: varchar("copyrightText", { length: 255 }),
  copyrightTextEn: varchar("copyrightTextEn", { length: 255 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type FooterSettings = typeof footerSettings.$inferSelect;
export type InsertFooterSettings = typeof footerSettings.$inferInsert;
