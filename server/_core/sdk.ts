import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { Admin } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

export type SessionPayload = {
  openId: string;
  appId: string;
  name: string;
};

class SDKServer {
  /**
   * Create a session token (JWT) for a user
   */
  async createSessionToken(
    openId: string,
    options?: { name?: string; expiresInMs?: number }
  ): Promise<string> {
    const payload: SessionPayload = {
      openId,
      appId: ENV.appId,
      name: options?.name || "",
    };

    const secret = new TextEncoder().encode(ENV.cookieSecret);
    const expiresInMs = options?.expiresInMs || 365 * 24 * 60 * 60 * 1000; // 1 year default

    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + Math.floor(expiresInMs / 1000))
      .sign(secret);
  }

  /**
   * Verify and decode a session token
   */
  async verifySessionToken(token: string): Promise<SessionPayload> {
    const secret = new TextEncoder().encode(ENV.cookieSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  }

  /**
   * Get current user from request (checks session cookie)
   */
  async getCurrentUser(req: Request): Promise<Admin | null> {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      console.log("[Auth] Missing cookie header");
      return null;
    }

    const cookies = parseCookieHeader(cookieHeader);
    const sessionToken = cookies[COOKIE_NAME];

    if (!sessionToken) {
      console.log("[Auth] Missing session cookie");
      return null;
    }

    try {
      const payload = await this.verifySessionToken(sessionToken);
      console.log("[Auth] Session payload:", payload);
      
      // Extract admin ID from openId (format: admin_123)
      if (payload.openId.startsWith('admin_')) {
        const adminId = parseInt(payload.openId.replace('admin_', ''));
        console.log("[Auth] Looking up admin ID:", adminId);
        const { getAdminById } = await import('../auth');
        const admin = await getAdminById(adminId);
        console.log("[Auth] Admin found:", admin ? { id: admin.id, email: admin.email } : null);
        return admin;
      }
      
      console.log("[Auth] Invalid openId format:", payload.openId);
      return null;
    } catch (error) {
      console.error("[Auth] Invalid session token:", error);
      return null;
    }
  }

  /**
   * Require authentication - throws ForbiddenError if not authenticated
   */
  async requireAuth(req: Request): Promise<Admin> {
    const user = await this.getCurrentUser(req);
    if (!user) {
      throw new ForbiddenError("Authentication required");
    }
    return user;
  }

  /**
   * Check if user is owner (admin)
   */
  isOwner(user: Admin | null): boolean {
    if (!user) return false;
    // Simple admin check - you can customize this
    // For now, any authenticated user is considered admin
    return true;
  }

  /**
   * Require owner (admin) access
   */
  async requireOwner(req: Request): Promise<Admin> {
    const user = await this.requireAuth(req);
    if (!this.isOwner(user)) {
      throw new ForbiddenError("Admin access required");
    }
    return user;
  }

  /**
   * Authenticate request and return admin if valid
   */
  async authenticateRequest(req: Request): Promise<Admin | null> {
    return await this.getCurrentUser(req);
  }
}

function parseCookieHeader(cookieHeader: string) {
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookies[key] = value;
    }
  });
  return cookies;
}

export const sdk = new SDKServer();
