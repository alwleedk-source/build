import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { getDb } from "./db";
import type { Admin, InsertAdmin, InsertPasswordResetToken } from "../drizzle/schema";
import { admins, passwordResetTokens } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

const SALT_ROUNDS = 12;
const RESET_TOKEN_EXPIRY_HOURS = 1;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Create a new admin
 */
export async function createAdmin(data: {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "super_admin";
}): Promise<Admin> {
  const passwordHash = await hashPassword(data.password);
  
  const insertData: InsertAdmin = {
    email: data.email.toLowerCase().trim(),
    passwordHash,
    name: data.name.trim(),
    role: data.role || "admin",
    isActive: 1,
  };

  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(admins).values(insertData);
  const adminId = Number(result[0].insertId);
  
  const admin = await db.select().from(admins).where(eq(admins.id, adminId)).limit(1);
  return admin[0];
}

/**
 * Get admin by email
 */
export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email.toLowerCase().trim()))
    .limit(1);
  
  return result[0] || null;
}

/**
 * Get admin by ID
 */
export async function getAdminById(id: number): Promise<Admin | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(admins)
    .where(eq(admins.id, id))
    .limit(1);
  
  return result[0] || null;
}

/**
 * Get all admins
 */
export async function getAllAdmins(): Promise<Admin[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(admins);
}

/**
 * Authenticate admin with email and password
 */
export async function authenticateAdmin(email: string, password: string): Promise<Admin | null> {
  const admin = await getAdminByEmail(email);
  
  if (!admin) {
    return null;
  }

  if (admin.isActive === 0) {
    return null; // Admin is deactivated
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  
  if (!isValid) {
    return null;
  }

  // Update last login time
  const dbForUpdate = await getDb();
  if (dbForUpdate) {
    await dbForUpdate
      .update(admins)
      .set({ lastLoginAt: new Date() })
      .where(eq(admins.id, admin.id));
  }

  return admin;
}

/**
 * Update admin password
 */
export async function updateAdminPassword(adminId: number, newPassword: string): Promise<void> {
  const passwordHash = await hashPassword(newPassword);
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(admins)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(admins.id, adminId));
}

/**
 * Update admin details
 */
export async function updateAdmin(
  adminId: number,
  data: { name?: string; email?: string; role?: "admin" | "super_admin"; isActive?: number }
): Promise<void> {
  const updateData: any = { updatedAt: new Date() };
  
  if (data.name !== undefined) updateData.name = data.name.trim();
  if (data.email !== undefined) updateData.email = data.email.toLowerCase().trim();
  if (data.role !== undefined) updateData.role = data.role;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(admins).set(updateData).where(eq(admins.id, adminId));
}

/**
 * Delete admin
 */
export async function deleteAdmin(adminId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(admins).where(eq(admins.id, adminId));
}

/**
 * Create password reset token
 */
export async function createPasswordResetToken(adminId: number): Promise<string> {
  const token = nanoid(64); // Generate secure random token
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + RESET_TOKEN_EXPIRY_HOURS);

  const insertData: InsertPasswordResetToken = {
    adminId,
    token,
    expiresAt,
    used: 0,
  };

  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(passwordResetTokens).values(insertData);
  
  return token;
}

/**
 * Verify and use password reset token
 */
export async function verifyPasswordResetToken(token: string): Promise<number | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, token),
        eq(passwordResetTokens.used, 0)
      )
    )
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const resetToken = result[0];

  // Check if token is expired
  if (new Date() > new Date(resetToken.expiresAt)) {
    return null;
  }

  // Mark token as used
  const dbForUpdate = await getDb();
  if (dbForUpdate) {
    await dbForUpdate
      .update(passwordResetTokens)
      .set({ used: 1 })
      .where(eq(passwordResetTokens.id, resetToken.id));
  }

  return resetToken.adminId;
}

/**
 * Clean up expired password reset tokens (optional maintenance task)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.used, 1));
}
