import { seedTestimonials, seedPartners } from './seed-data';

export async function handleSeedTestimonialsPartners(req: any, res: any) {
  try {
    console.log('[Seed Testimonials & Partners] Starting...');
    
    await seedTestimonials();
    await seedPartners();
    
    console.log('[Seed Testimonials & Partners] Complete!');
    
    res.json({
      success: true,
      message: 'Testimonials and partners seeded successfully'
    });
  } catch (error: any) {
    console.error('[Seed Testimonials & Partners] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
