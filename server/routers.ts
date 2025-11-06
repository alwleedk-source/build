import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
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
    create: publicProcedure
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
    update: publicProcedure
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
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
    updateOrder: publicProcedure
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
    create: publicProcedure
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
    update: publicProcedure
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
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
    updateOrder: publicProcedure
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
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        logo: z.string(),
        url: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPartner(input as InsertPartner);
      }),
    update: publicProcedure
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
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deletePartner(input.id);
        return { success: true };
      }),
    updateOrder: publicProcedure
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
    create: publicProcedure
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
    update: publicProcedure
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
    delete: publicProcedure
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
    upsert: publicProcedure
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
    getAll: publicProcedure.query(async () => {
      return await db.getAllContactMessages();
    }),
    getUnread: publicProcedure.query(async () => {
      return await db.getUnreadContactMessages();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContactMessageById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        name: z.string().min(2, "Naam moet minimaal 2 tekens bevatten").max(255, "Naam is te lang"),
        email: z.string().email("Ongeldig e-mailadres"),
        phone: z.string().optional(),
        message: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten").max(5000, "Bericht is te lang"),
      }))
      .mutation(async ({ input, ctx }) => {
        // Get client IP address
        const ipAddress = ctx.req?.headers['x-forwarded-for'] || 
                         ctx.req?.headers['x-real-ip'] || 
                         ctx.req?.socket?.remoteAddress || 
                         'unknown';
        const clientIp = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress.split(',')[0].trim();
        
        // Create message hash for duplicate detection
        const crypto = await import('crypto');
        const messageContent = `${input.email}:${input.message}`;
        const messageHash = crypto.createHash('sha256').update(messageContent).digest('hex');
        
        // Rate Limiting: Check messages from this IP in the last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentMessages = await db.getRecentMessagesByIp(clientIp, oneHourAgo);
        
        if (recentMessages.length >= 3) {
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: 'Te veel berichten verzonden. Probeer het over een uur opnieuw.',
          });
        }
        
        // Duplicate Detection: Check for same message in last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const duplicateMessage = await db.getDuplicateMessage(messageHash, tenMinutesAgo);
        
        if (duplicateMessage) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Dit bericht is al verzonden. Wacht 10 minuten voordat u hetzelfde bericht opnieuw verzendt.',
          });
        }
        
        // Save message to database with IP and hash
        const result = await db.createContactMessage({
          ...input,
          ipAddress: clientIp,
          messageHash,
        } as InsertContactMessage);
        
        // Send auto-reply email if enabled
        try {
          console.log('[EMAIL] Fetching email settings...');
          const emailSettings = await db.getEmailSettings();
          console.log('[EMAIL] Email settings:', emailSettings);
          if (emailSettings) {
            const { sendEmail, generateAutoReplyEmail, generateAdminNotificationEmail } = await import('./email');
            
            // Send auto-reply to customer
            console.log('[EMAIL] Auto-reply enabled:', emailSettings.autoReplyEnabled);
            if (emailSettings.autoReplyEnabled === 1) {
              console.log('[EMAIL] Sending auto-reply to:', input.email);
              const { html, text, subject } = generateAutoReplyEmail(
                input.name,
                input.message,
                emailSettings.autoReplySubject || 'Bedankt voor uw bericht',
                emailSettings.contactPhone || undefined,
                emailSettings.contactEmail || undefined
              );
              
              const result = await sendEmail({
                to: input.email,
                subject,
                html,
                text,
              });
              
              console.log('[EMAIL] Auto-reply result:', result);
              if (!result.success) {
                console.error('[EMAIL] Failed to send auto-reply:', result.error);
              } else {
                console.log('[EMAIL] Auto-reply sent successfully!');
              }
            }
                   // Send admin notification if enabled
            console.log('[EMAIL] Notifications enabled:', emailSettings.notificationEnabled);
            console.log('[EMAIL] Notification email:', emailSettings.notificationEmail);
            if (emailSettings.notificationEnabled === 1 && emailSettings.notificationEmail) {
              console.log('[EMAIL] Sending admin notification to:', emailSettings.notificationEmail);
              const adminUrl = process.env.BASE_URL || process.env.VITE_APP_URL || 'https://3000-inpva7zdyqt9cs1afrhno-86331ac5.manusvm.computer';
              const { html: adminHtml, text: adminText } = generateAdminNotificationEmail(
                input.name,
                input.email,
                input.phone || null,
                input.message,
                result.id || 0,
                adminUrl
              );
              
              const notifResult = await sendEmail({
                to: emailSettings.notificationEmail,
                subject: `Nieuw bericht van ${input.name}`,
                html: adminHtml,
                text: adminText,
              });
              
              console.log('[EMAIL] Admin notification result:', notifResult);
              if (!notifResult.success) {
                console.error('[EMAIL] Failed to send admin notification:', notifResult.error);
              } else {
                console.log('[EMAIL] Admin notification sent successfully!');
              }
            }
          }
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
          // Don't fail the request if email fails
        }
        
        return result;
      }),
    markAsRead: publicProcedure
      .input(z.object({ id: z.number(), isRead: z.number().optional() }))
      .mutation(async ({ input }) => {
        return await db.markContactMessageAsRead(input.id, input.isRead);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteContactMessage(input.id);
      }),
  }),

  // Email Settings router
  emailSettings: router({
    get: publicProcedure.query(async () => {
      return await db.getEmailSettings();
    }),
    upsert: publicProcedure
      .input(z.object({
        smtpHost: z.string().optional(),
        smtpPort: z.number().optional(),
        smtpUser: z.string().optional(),
        smtpPassword: z.string().optional(),
        fromEmail: z.string().optional(),
        fromName: z.string().optional(),
        autoReplyEnabled: z.number().optional(),
        autoReplySubject: z.string().optional(),
        autoReplyMessage: z.string().optional(),
        notificationEnabled: z.number().optional(),
        notificationEmail: z.string().optional(),
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
    create: publicProcedure
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
    update: publicProcedure
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
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteTestimonial(input.id);
      }),
    updateOrder: publicProcedure
      .input(z.array(z.object({ id: z.number(), order: z.number() })))
      .mutation(async ({ input }) => {
        return await db.updateTestimonialsOrder(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
