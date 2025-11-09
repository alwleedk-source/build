import { Request, Response, Router } from "express";
import { db } from "./db";
import { sql } from "drizzle-orm";

const router = Router();

router.post("/quick-add-service-images", async (req: Request, res: Response) => {
  try {
    // Add image column if not exists
    await db.execute(sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS image TEXT`);
    
    // Update services with Unsplash images
    const images = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', // Nieuwbouw
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop', // Renovatie
      'https://images.unsplash.com/photo-1589939705384-5185137a336d?w=800&h=600&fit=crop', // Afwerking
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop', // Onderhoud
    ];
    
    const slugs = ['nieuwbouw', 'renovatie', 'afwerking', 'onderhoud'];
    
    for (let i = 0; i < slugs.length; i++) {
      await db.execute(
        sql`UPDATE services SET image = ${images[i]} WHERE slug = ${slugs[i]}`
      );
    }
    
    res.json({ 
      success: true, 
      message: "Service images added successfully",
      servicesUpdated: slugs.length
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    res.status(500).json({ error: "Migration failed", message: error.message });
  }
});

export default router;
