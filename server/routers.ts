import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { InsertProject, InsertService, InsertBlogPost, InsertPartner, InsertTestimonial, InsertContactMessage } from "../drizzle/schema";

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
        showOnHomepage: z.number().optional(),
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
    updateOrder: adminProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          order: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        await db.updateProjectsOrder(input.items);
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
    updateOrder: adminProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          order: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        await db.updateServicesOrder(input.items);
        return { success: true };
      }),
  }),

  // Partners router
  partners: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllPartners();
    }),
    getActive: publicProcedure.query(async () => {
      return await db.getActivePartners();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPartnerById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        logo: z.string(),
        url: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPartner(input as InsertPartner);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        logo: z.string().optional(),
        url: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updatePartner(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deletePartner(input.id);
        return { success: true };
      }),
    updateOrder: adminProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          order: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        await db.updatePartnersOrder(input.items);
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

  // Site Settings router
  siteSettings: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllSiteSettings();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSiteSettingByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        type: z.enum(["text", "boolean", "number", "json"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertSiteSetting(input);
      }),
  }),

  // Contact Messages router
  contactMessages: router({
    getAll: adminProcedure.query(async () => {
      return await db.getAllContactMessages();
    }),
    getUnread: adminProcedure.query(async () => {
      return await db.getUnreadContactMessages();
    }),
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContactMessageById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Save message to database
        const result = await db.createContactMessage(input as InsertContactMessage);
        
        // Send auto-reply email if enabled
        try {
          const emailSettings = await db.getEmailSettings();
          if (emailSettings) {
            const { sendEmail, generateAutoReplyEmail, generateAdminNotificationEmail } = await import('./email');
            
            // Send auto-reply to customer
            if (emailSettings.autoReplyEnabled === 1) {
              const { html, text } = generateAutoReplyEmail(
                input.name,
                emailSettings.autoReplyMessage?.replace('{naam}', input.name)
              );
              
              await sendEmail(emailSettings, {
                to: input.email,
                subject: emailSettings.autoReplySubject || 'Bedankt voor uw bericht',
                html,
                text,
              });
            }
            
            // Send notification to admin
            if (emailSettings.notificationEnabled === 1 && emailSettings.notificationEmail) {
              const adminUrl = process.env.VITE_APP_URL || 'https://buildcraft.manus.space';
              const { html: adminHtml, text: adminText } = generateAdminNotificationEmail(
                input.name,
                input.email,
                input.phone || null,
                input.message,
                result.id || 0,
                adminUrl
              );
              
              await sendEmail(emailSettings, {
                to: emailSettings.notificationEmail,
                subject: `Nieuw bericht van ${input.name}`,
                html: adminHtml,
                text: adminText,
              });
            }
          }
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
          // Don't fail the request if email fails
        }
        
        return result;
      }),
    markAsRead: adminProcedure
      .input(z.object({ id: z.number(), isRead: z.number().optional() }))
      .mutation(async ({ input }) => {
        return await db.markContactMessageAsRead(input.id, input.isRead);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteContactMessage(input.id);
      }),
  }),

  // Email Settings router
  emailSettings: router({
    get: adminProcedure.query(async () => {
      return await db.getEmailSettings();
    }),
    upsert: adminProcedure
      .input(z.object({
        smtpHost: z.string().optional(),
        smtpPort: z.number().optional(),
        smtpUser: z.string().optional(),
        smtpPassword: z.string().optional(),
        fromEmail: z.string().email().optional(),
        fromName: z.string().optional(),
        autoReplyEnabled: z.number().optional(),
        autoReplySubject: z.string().optional(),
        autoReplyMessage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertEmailSettings(input as any);
      }),
  }),

  // Testimonials router
  testimonials: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTestimonials();
    }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        position: z.string(),
        company: z.string().optional(),
        content: z.string(),
        rating: z.number().min(1).max(5),
        image: z.string().optional(),
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
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateTestimonial(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteTestimonial(input.id);
      }),
    updateOrder: adminProcedure
      .input(z.array(z.object({ id: z.number(), order: z.number() })))
      .mutation(async ({ input }) => {
        return await db.updateTestimonialsOrder(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
