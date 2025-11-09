import { Router } from 'express';
import { getDb } from './db';
import { services } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = Router();

router.post('/test-service-update', async (req, res) => {
  try {
    const db = getDb();
    
    // Update Nieuwbouw (id=9) with test image
    const testImageUrl = 'https://pub-d7d27ea540844e02b2a9ebb7e1f16900.r2.dev/services/test-service-1762703652466-c2e8f2d3.jpg';
    
    await db.update(services)
      .set({ image: testImageUrl })
      .where(eq(services.id, 9));
    
    // Verify update
    const updated = await db.select().from(services).where(eq(services.id, 9));
    
    res.json({
      success: true,
      message: 'Service image updated',
      service: updated[0]
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service', message: error.message });
  }
});

export default router;
