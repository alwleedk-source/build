import { Router } from 'express';
import { updateService, getServiceById } from './db';

const router = Router();

router.post('/test-service-update', async (req, res) => {
  try {
    // Update Nieuwbouw (id=9) with test image
    const testImageUrl = 'https://pub-d7d27ea540844e02b2a9ebb7e1f16900.r2.dev/services/test-service-1762703652466-c2e8f2d3.jpg';
    
    await updateService(9, { image: testImageUrl });
    
    // Verify update
    const updated = await getServiceById(9);
    
    res.json({
      success: true,
      message: 'Service image updated',
      service: updated
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service', message: error.message });
  }
});

export default router;
