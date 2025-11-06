import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { InsertProject, InsertService, InsertBlogPost, InsertTestimonial, InsertTeamMember, InsertContactMessage, InsertMedia, InsertSiteSetting } from "../drizzle/schema";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects router
  projects: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllProjects();
    }),
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedProjects();
    }),
    getHomepage: publicProcedure.query(async () => {
      return await db.getHomepageProjects();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProjectById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(["Residentieel", "Commercieel", "Industrieel"]),
        image: z.string(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createProject(input as InsertProject);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["Residentieel", "Commercieel", "Industrieel"]).optional(),
        image: z.string().optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProject(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
  }),

  // Services router
  services: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllServices();
    }),
    getHomepage: publicProcedure.query(async () => {
      return await db.getHomepageServices();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getServiceBySlug(input.slug);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getServiceById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        longDescription: z.string(),
        icon: z.string(),
        features: z.string(), // JSON string
        showOnHomepage: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createService(input as InsertService);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        longDescription: z.string().optional(),
        icon: z.string().optional(),
        features: z.string().optional(),
        showOnHomepage: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateService(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // Blog router
  blog: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllBlogPosts();
    }),
    getPublished: publicProcedure.query(async () => {
      return await db.getPublishedBlogPosts();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBlogPostById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        content: z.string(),
        image: z.string(),
        category: z.string(),
        authorId: z.number(),
        published: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createBlogPost(input as InsertBlogPost);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        published: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateBlogPost(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBlogPost(input.id);
        return { success: true };
      }),
  }),

  // Testimonials router
  testimonials: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTestimonials();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTestimonialById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        position: z.string(),
        company: z.string().optional(),
        content: z.string(),
        rating: z.number().min(1).max(5).optional(),
        image: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createTestimonial(input as InsertTestimonial);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        position: z.string().optional(),
        company: z.string().optional(),
        content: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        image: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateTestimonial(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // Team router
  team: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTeamMembers();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeamMemberById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        position: z.string(),
        bio: z.string().optional(),
        image: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createTeamMember(input as InsertTeamMember);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        position: z.string().optional(),
        bio: z.string().optional(),
        image: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateTeamMember(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTeamMember(input.id);
        return { success: true };
      }),
  }),

  // Messages router
  messages: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllMessages();
    }),
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getMessageById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.createMessage(input as InsertContactMessage);
      }),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        isRead: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.updateMessageStatus(input.id, input.isRead);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteMessage(input.id);
        return { success: true };
      }),
  }),

  // Media router
  media: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllMedia();
    }),
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getMediaById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        filename: z.string(),
        url: z.string(),
        type: z.enum(["image", "video", "document"]).optional(),
        category: z.string().optional(),
        size: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createMedia(input as InsertMedia);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteMedia(input.id);
        return { success: true };
      }),
  }),

  // Settings router
  settings: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllSettings();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSettingByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        type: z.enum(["text", "number", "boolean", "json", "image"]).optional(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertSetting(input.key, input.value, input.type);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteSetting(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
