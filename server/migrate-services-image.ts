import { Router } from "express";
import { db } from "./db";
import { sql } from "drizzle-orm";

const router = Router();

router.post("/migrate-services-image", async (req, res) => {
  try {
    // Add image column to services table
    await db.execute(sql`
      ALTER TABLE services 
      ADD COLUMN IF NOT EXISTS image VARCHAR(500)
    `);

    // Update existing services with Unsplash images (same as hardcoded in frontend)
    const unsplashImages = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a336d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
    ];

    // Get all services ordered by id
    const services = await db.execute(sql`SELECT id FROM services ORDER BY id`);
    
    // Update each service with corresponding image
    for (let i = 0; i < services.rows.length && i < unsplashImages.length; i++) {
      await db.execute(sql`
        UPDATE services 
        SET image = ${unsplashImages[i]}
        WHERE id = ${services.rows[i].id}
      `);
    }

    res.json({
      success: true,
      message: "Services image column added and populated",
      servicesUpdated: Math.min(services.rows.length, unsplashImages.length)
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
