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
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return await db.getProjectBySlug(input);
      }),
    create: publicProcedure
      .input(z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        description: z.string(),
        descriptionEn: z.string().optional(),
        category: z.enum(["Residentieel", "Commercieel", "Industrieel"]),
        image: z.string().optional(),
        featured: z.number().optional(),
        showOnHomepage: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createProject(input as InsertProject);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        category: z.enum(["Residentieel", "Commercieel", "Industrieel"]).optional(),
        image: z.string().optional(),
        images: z.string().optional(),
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
        titleEn: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        longDescription: z.string().optional(),
        longDescriptionEn: z.string().optional(),
        icon: z.string().optional(),
        image: z.string().optional(),
        features: z.string().optional(),
        featuresEn: z.string().optional(),
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
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedPartners();
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
      const posts = await db.getPublishedBlogPosts();
      console.log('[TRPC] blog.getPublished called, returning', posts.length, 'posts');
      return posts;
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
        published: z.boolean().optional(),
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
        published: z.boolean().optional(),
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
      return await db.getSiteSettings();
    }),
    update: publicProcedure
      .input(z.object({
        siteName: z.string().optional(),
        siteDescription: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        address: z.string().optional(),
        socialFacebook: z.string().optional(),
        socialTwitter: z.string().optional(),
        socialInstagram: z.string().optional(),
        socialLinkedin: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateSiteSettings(input);
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
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedTestimonials();
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

  // Upload router (Cloudflare R2)
  upload: router({
    generateUploadUrl: publicProcedure
      .input(z.object({
        filename: z.string(),
        contentType: z.string(),
        folder: z.enum(['projects', 'services', 'blog', 'partners', 'testimonials', 'general']),
      }))
      .mutation(async ({ input }) => {
        const { generateUploadUrl, generateFileKey, isValidFileType } = await import('./r2');
        
        // Validate file type
        if (!isValidFileType(input.contentType)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid file type. Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM) are allowed.',
          });
        }

        // Generate unique key
        const key = generateFileKey(input.folder, input.filename);

        // Generate presigned URL
        const result = await generateUploadUrl(key, input.contentType);
        return result;
      }),
    
    deleteFile: publicProcedure
      .input(z.object({
        url: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { deleteFile, extractKeyFromUrl } = await import('./r2');
        
        const key = extractKeyFromUrl(input.url);
        if (!key) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid file URL',
          });
        }

        await deleteFile(key);
        return { success: true };
      }),
  }),

  // Admin authentication and management router
  admin: router({
    // Login with email/password
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input, ctx }) => {
        const { authenticateAdmin } = await import('./auth');
        const admin = await authenticateAdmin(input.email, input.password);
        
        if (!admin) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'بيانات تسجيل الدخول غير صحيحة',
          });
        }

        // Create session token
        const { sdk } = await import('./_core/sdk');
        const sessionToken = await sdk.createSessionToken(`admin_${admin.id}`, {
          name: admin.name,
          expiresInMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { 
          ...cookieOptions, 
          maxAge: 30 * 24 * 60 * 60 * 1000 
        });

        return {
          success: true,
          redirectUrl: '/admin',  // Force redirect to admin dashboard
          admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          },
        };
      }),

    // Request password reset
    forgotPassword: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        const { getAdminByEmail, createPasswordResetToken } = await import('./auth');
        const { sendPasswordResetEmail } = await import('./email');
        
        const admin = await getAdminByEmail(input.email);
        
        // Always return success to prevent email enumeration
        if (!admin) {
          return { success: true };
        }

        const token = await createPasswordResetToken(admin.id);
        await sendPasswordResetEmail(admin.email, admin.name, token);
        
        return { success: true };
      }),

    // Reset password with token
    resetPassword: publicProcedure
      .input(z.object({
        token: z.string(),
        newPassword: z.string().min(8),
      }))
      .mutation(async ({ input }) => {
        const { verifyPasswordResetToken, updateAdminPassword } = await import('./auth');
        
        const adminId = await verifyPasswordResetToken(input.token);
        
        if (!adminId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية',
          });
        }

        await updateAdminPassword(adminId, input.newPassword);
        
        return { success: true };
      }),

    // Get all admins (protected)
    getAll: publicProcedure.query(async () => {
      const { getAllAdmins } = await import('./auth');
      return await getAllAdmins();
    }),

    // Create new admin (protected)
    create: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
        role: z.enum(['admin', 'super_admin']).optional(),
      }))
      .mutation(async ({ input }) => {
        const { createAdmin, getAdminByEmail } = await import('./auth');
        
        // Check if email already exists
        const existing = await getAdminByEmail(input.email);
        if (existing) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'البريد الإلكتروني مستخدم بالفعل',
          });
        }

        const admin = await createAdmin(input);
        
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      }),

    // Update admin (protected)
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        role: z.enum(['admin', 'super_admin']).optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateAdmin } = await import('./auth');
        const { id, ...data } = input;
        await updateAdmin(id, data);
        return { success: true };
      }),

    // Change password (protected)
    changePassword: publicProcedure
      .input(z.object({
        id: z.number(),
        newPassword: z.string().min(8),
      }))
      .mutation(async ({ input }) => {
        const { updateAdminPassword } = await import('./auth');
        await updateAdminPassword(input.id, input.newPassword);
        return { success: true };
      }),

    // Delete admin (protected)
    delete: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        const { deleteAdmin } = await import('./auth');
        await deleteAdmin(input.id);
        return { success: true };
      }),
  }),

  // Home Settings router
  homeSettings: router({
    // Get home settings
    get: publicProcedure.query(async () => {
      const db = await import('./db');
      const settings = await db.getHomeSettings();
      return settings || {
        heroTitle: 'Bouw uw dromen',
        heroTitleEn: 'Build your dreams',
        heroSubtitle: 'met BuildCraft',
        heroSubtitleEn: 'with BuildCraft',
        heroDescription: 'Professionele bouw- en onderhoudsdiensten voor uw gebouwen. Van nieuwbouw tot renovatie, wij maken het mogelijk.',
        heroDescriptionEn: 'Professional construction and maintenance services for your buildings. From new construction to renovation, we make it possible.',
        stat1Value: '15+',
        stat1Label: 'Jaar ervaring',
        stat1LabelEn: 'Years of experience',
        stat2Value: '500+',
        stat2Label: 'Projecten',
        stat2LabelEn: 'Projects',
        stat3Value: '98%',
        stat3Label: 'Tevredenheid',
        stat3LabelEn: 'Satisfaction',
      };
    }),

    // Update home settings
    update: publicProcedure
      .input(z.object({
        heroTitle: z.string(),
        heroTitleEn: z.string(),
        heroSubtitle: z.string(),
        heroSubtitleEn: z.string(),
        heroDescription: z.string(),
        heroDescriptionEn: z.string(),
        stat1Value: z.string(),
        stat1Label: z.string(),
        stat1LabelEn: z.string(),
        stat2Value: z.string(),
        stat2Label: z.string(),
        stat2LabelEn: z.string(),
        stat3Value: z.string(),
        stat3Label: z.string(),
        stat3LabelEn: z.string(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        await db.updateHomeSettings(input);
        return { success: true };
      }),
  }),

  // About Us router
  aboutUs: router({
    // Get about us
    get: publicProcedure.query(async () => {
      const db = await import('./db');
      return await db.getAboutUs();
    }),

    // Create about us
    create: publicProcedure
      .input(z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        subtitle: z.string().optional(),
        subtitleEn: z.string().optional(),
        description: z.string(),
        descriptionEn: z.string().optional(),
        mission: z.string().optional(),
        missionEn: z.string().optional(),
        vision: z.string().optional(),
        visionEn: z.string().optional(),
        values: z.string().optional(),
        valuesEn: z.string().optional(),
        yearsExperience: z.number().optional(),
        projectsCompleted: z.number().optional(),
        happyClients: z.number().optional(),
        teamMembers: z.number().optional(),
        image: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.createAboutUs(input);
      }),

    // Update about us
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEn: z.string().optional(),
        subtitle: z.string().optional(),
        subtitleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        mission: z.string().optional(),
        missionEn: z.string().optional(),
        vision: z.string().optional(),
        visionEn: z.string().optional(),
        values: z.string().optional(),
        valuesEn: z.string().optional(),
        yearsExperience: z.number().optional(),
        projectsCompleted: z.number().optional(),
        happyClients: z.number().optional(),
        teamMembers: z.number().optional(),
        image: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        const { id, ...data } = input;
        return await db.updateAboutUs(id, data);
      }),
  }),

  // Hero Section router
  heroSection: router({
    // Get hero section
    get: publicProcedure
      .query(async () => {
        const db = await import('./db');
        return await db.getHeroSection();
      }),

    // Create hero section
    create: publicProcedure
      .input(z.object({
        style: z.enum(["classic", "split", "minimal", "fullBackground", "videoBackground"]).optional(),
        title: z.string(),
        titleEn: z.string().optional(),
        subtitle: z.string().optional(),
        subtitleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        backgroundImage: z.string().optional(),
        videoUrl: z.string().optional(),
        overlayOpacity: z.number().optional(),
        textAlignment: z.string().optional(),
        primaryButtonText: z.string().optional(),
        primaryButtonTextEn: z.string().optional(),
        primaryButtonLink: z.string().optional(),
        secondaryButtonText: z.string().optional(),
        secondaryButtonTextEn: z.string().optional(),
        secondaryButtonLink: z.string().optional(),
        showStats: z.number().optional(),
        stat1Value: z.number().optional(),
        stat1Label: z.string().optional(),
        stat1LabelEn: z.string().optional(),
        stat2Value: z.number().optional(),
        stat2Label: z.string().optional(),
        stat2LabelEn: z.string().optional(),
        stat3Value: z.number().optional(),
        stat3Label: z.string().optional(),
        stat3LabelEn: z.string().optional(),
        stat4Value: z.number().optional(),
        stat4Label: z.string().optional(),
        stat4LabelEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.createHeroSection(input);
      }),

    // Update hero section
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        style: z.enum(["classic", "split", "minimal", "fullBackground", "videoBackground"]).optional(),
        title: z.string().optional(),
        titleEn: z.string().optional(),
        subtitle: z.string().optional(),
        subtitleEn: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        backgroundImage: z.string().optional(),
        videoUrl: z.string().optional(),
        overlayOpacity: z.number().optional(),
        textAlignment: z.string().optional(),
        primaryButtonText: z.string().optional(),
        primaryButtonTextEn: z.string().optional(),
        primaryButtonLink: z.string().optional(),
        secondaryButtonText: z.string().optional(),
        secondaryButtonTextEn: z.string().optional(),
        secondaryButtonLink: z.string().optional(),
        showStats: z.number().optional(),
        stat1Value: z.number().optional(),
        stat1Label: z.string().optional(),
        stat1LabelEn: z.string().optional(),
        stat2Value: z.number().optional(),
        stat2Label: z.string().optional(),
        stat2LabelEn: z.string().optional(),
        stat3Value: z.number().optional(),
        stat3Label: z.string().optional(),
        stat3LabelEn: z.string().optional(),
        stat4Value: z.number().optional(),
        stat4Label: z.string().optional(),
        stat4LabelEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        const { id, ...data } = input;
        return await db.updateHeroSection(id, data);
      }),
  }),

  // Footer Settings router
  footerSettings: router({
    // Get footer settings
    get: publicProcedure
      .query(async () => {
        const db = await import('./db');
        return await db.getFooterSettings();
      }),

    // Create footer settings
    create: publicProcedure
      .input(z.object({
        companyName: z.string(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        facebookUrl: z.string().optional(),
        twitterUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        youtubeUrl: z.string().optional(),
        copyrightText: z.string().optional(),
        copyrightTextEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.createFooterSettings(input);
      }),

    // Update footer settings
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        companyName: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        facebookUrl: z.string().optional(),
        twitterUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        youtubeUrl: z.string().optional(),
        copyrightText: z.string().optional(),
        copyrightTextEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        const { id, ...data } = input;
        return await db.updateFooterSettings(id, data);
      }),
  }),

  // Team Members router
  teamMembers: router({
    // Get all team members
    getAll: publicProcedure.query(async () => {
      const db = await import('./db');
      return await db.getAllTeamMembers();
    }),

    // Get team member by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = await import('./db');
        return await db.getTeamMemberById(input.id);
      }),

    // Create team member
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        position: z.string(),
        positionEn: z.string().optional(),
        bio: z.string().optional(),
        bioEn: z.string().optional(),
        image: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.createTeamMember(input);
      }),

    // Update team member
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        position: z.string().optional(),
        positionEn: z.string().optional(),
        bio: z.string().optional(),
        bioEn: z.string().optional(),
        image: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        const { id, ...data } = input;
        return await db.updateTeamMember(id, data);
      }),

    // Delete team member
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.deleteTeamMember(input.id);
      }),

    // Update team members order
    updateOrder: publicProcedure
      .input(z.object({
        items: z.array(z.object({
          id: z.number(),
          order: z.number(),
        })),
      }))
      .mutation(async ({ input }) => {
        const db = await import('./db');
        return await db.updateTeamMembersOrder(input.items);
      }),
  }),
});

export type AppRouter = typeof appRouter;
