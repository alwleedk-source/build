import { db } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedServices() {
  try {
    // Read services data
    const servicesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../services_content.json'), 'utf-8')
    );

    console.log(`📦 Adding ${servicesData.length} services...`);

    for (const service of servicesData) {
      const result = await db.createService({
        title: service.title,
        titleEn: service.titleEn,
        slug: service.slug,
        description: service.description,
        descriptionEn: service.descriptionEn,
        longDescription: service.longDescription,
        longDescriptionEn: service.longDescriptionEn,
        icon: service.icon,
        features: service.features,
        featuresEn: service.featuresEn,
        showOnHomepage: service.showOnHomepage ? 1 : 0,
      });
      
      console.log(`✅ Added: ${service.title}`);
    }

    console.log('🎉 All services added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
}

seedServices();
