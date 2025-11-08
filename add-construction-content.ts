import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle/schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(databaseUrl);
const db = drizzle(client, { schema });

async function addConstructionContent() {
  console.log('🏗️ Adding Dutch construction company content...\n');

  try {
    // 1. Add Services
    console.log('📋 Adding services...');
    const services = [
      {
        title: 'Nieuwbouw',
        titleEn: 'New Construction',
        slug: 'nieuwbouw',
        description: 'Professionele nieuwbouwprojecten voor woningen en bedrijfspanden. Van ontwerp tot oplevering verzorgen wij het complete bouwproces.',
        descriptionEn: 'Professional new construction projects for residential and commercial buildings. From design to delivery, we take care of the complete construction process.',
        longDescription: 'Wij realiseren nieuwbouwprojecten van A tot Z. Of het nu gaat om een moderne villa, een appartementencomplex of een bedrijfspand, ons ervaren team zorgt voor een vlekkeloze uitvoering. We werken volgens de nieuwste bouwvoorschriften en gebruiken duurzame materialen voor een toekomstbestendig resultaat.',
        longDescriptionEn: 'We realize new construction projects from A to Z. Whether it\'s a modern villa, an apartment complex or a commercial building, our experienced team ensures flawless execution. We work according to the latest building regulations and use sustainable materials for a future-proof result.',
        icon: '🏗️',
        features: JSON.stringify(['Compleet bouwproces', 'Duurzame materialen', 'Moderne technieken', 'Vaste opleverdatum']),
        featuresEn: JSON.stringify(['Complete construction process', 'Sustainable materials', 'Modern techniques', 'Fixed delivery date']),
        showOnHomepage: true,
        order: 1
      },
      {
        title: 'Renovatie',
        titleEn: 'Renovation',
        slug: 'renovatie',
        description: 'Vakkundige renovatie van woningen en bedrijfspanden. Wij geven uw pand een nieuwe uitstraling met respect voor het bestaande.',
        descriptionEn: 'Professional renovation of residential and commercial buildings. We give your property a new look with respect for the existing structure.',
        longDescription: 'Van kleine aanpassingen tot complete renovaties - wij hebben de expertise om uw pand te transformeren. We combineren vakmanschap met moderne technieken en zorgen voor minimale overlast tijdens de werkzaamheden.',
        longDescriptionEn: 'From small adjustments to complete renovations - we have the expertise to transform your property. We combine craftsmanship with modern techniques and ensure minimal inconvenience during the work.',
        icon: '🔨',
        features: JSON.stringify(['Stijlvolle verbouwingen', 'Minimale overlast', 'Energiebesparend', 'Waardeverhoging']),
        featuresEn: JSON.stringify(['Stylish renovations', 'Minimal inconvenience', 'Energy-saving', 'Value increase']),
        showOnHomepage: true,
        order: 2
      },
      {
        title: 'Afwerking',
        titleEn: 'Finishing',
        slug: 'afwerking',
        description: 'Hoogwaardige afwerking voor binnen en buiten. Van stucwerk tot tegelwerk, wij zorgen voor een perfecte finish.',
        descriptionEn: 'High-quality finishing for interior and exterior. From plastering to tiling, we ensure a perfect finish.',
        longDescription: 'De afwerking maakt het verschil. Ons team van specialisten zorgt voor een vlekkeloze afwerking van uw project. We werken met de beste materialen en technieken voor een duurzaam en esthetisch resultaat.',
        longDescriptionEn: 'The finish makes the difference. Our team of specialists ensures a flawless finish of your project. We work with the best materials and techniques for a durable and aesthetic result.',
        icon: '🎨',
        features: JSON.stringify(['Stucwerk', 'Tegelwerk', 'Schilderwerk', 'Vloeren']),
        featuresEn: JSON.stringify(['Plastering', 'Tiling', 'Painting', 'Flooring']),
        showOnHomepage: true,
        order: 3
      },
      {
        title: 'Onderhoud',
        titleEn: 'Maintenance',
        slug: 'onderhoud',
        description: 'Regelmatig onderhoud voorkomt grote kosten. Wij verzorgen het complete onderhoud van uw pand.',
        descriptionEn: 'Regular maintenance prevents major costs. We take care of the complete maintenance of your property.',
        longDescription: 'Preventief onderhoud is essentieel voor het behoud van uw pand. We bieden onderhoudscontracten op maat en zorgen ervoor dat uw gebouw in optimale staat blijft. Van kleine reparaties tot groot onderhoud.',
        longDescriptionEn: 'Preventive maintenance is essential for preserving your property. We offer customized maintenance contracts and ensure that your building remains in optimal condition. From small repairs to major maintenance.',
        icon: '🔧',
        features: JSON.stringify(['Onderhoudscontracten', 'Snelle service', 'Preventief onderhoud', 'Reparaties']),
        featuresEn: JSON.stringify(['Maintenance contracts', 'Fast service', 'Preventive maintenance', 'Repairs']),
        showOnHomepage: true,
        order: 4
      }
    ];

    for (const service of services) {
      await db.insert(schema.services).values(service).onConflictDoNothing();
      console.log(`  ✅ Added: ${service.title}`);
    }

    // 2. Add Projects
    console.log('\n🏘️ Adding projects...');
    const projects = [
      {
        title: 'Villa Amsterdam Noord',
        titleEn: 'Villa Amsterdam North',
        description: 'Moderne villa met duurzame materialen en energiezuinige installaties.',
        descriptionEn: 'Modern villa with sustainable materials and energy-efficient installations.',
        category: 'Nieuwbouw',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        featured: true,
        showOnHomepage: true,
        order: 1
      },
      {
        title: 'Kantoorpand Rotterdam',
        titleEn: 'Office Building Rotterdam',
        description: 'Complete renovatie van kantoorpand met moderne uitstraling.',
        descriptionEn: 'Complete renovation of office building with modern appearance.',
        category: 'Renovatie',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        featured: true,
        showOnHomepage: true,
        order: 2
      },
      {
        title: 'Appartementencomplex Utrecht',
        titleEn: 'Apartment Complex Utrecht',
        description: 'Nieuwbouw van 24 luxe appartementen in het centrum van Utrecht.',
        descriptionEn: 'New construction of 24 luxury apartments in the center of Utrecht.',
        category: 'Nieuwbouw',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        featured: true,
        showOnHomepage: true,
        order: 3
      },
      {
        title: 'Woonhuis Den Haag',
        titleEn: 'Residence The Hague',
        description: 'Volledige renovatie en uitbreiding van klassieke stadswoning.',
        descriptionEn: 'Complete renovation and extension of classic townhouse.',
        category: 'Renovatie',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        featured: false,
        showOnHomepage: false,
        order: 4
      }
    ];

    for (const project of projects) {
      await db.insert(schema.projects).values(project).onConflictDoNothing();
      console.log(`  ✅ Added: ${project.title}`);
    }

    // 3. Add Testimonials
    console.log('\n💬 Adding testimonials...');
    const testimonials = [
      {
        name: 'Jan de Vries',
        company: 'Particulier',
        companyEn: 'Private',
        text: 'BuildCraft heeft onze droomvilla perfect gerealiseerd. Vakmanschap en service van het hoogste niveau!',
        textEn: 'BuildCraft perfectly realized our dream villa. Craftsmanship and service of the highest level!',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Jan+de+Vries&background=0D8ABC&color=fff',
        featured: true
      },
      {
        name: 'Maria Jansen',
        company: 'Jansen Vastgoed',
        companyEn: 'Jansen Real Estate',
        text: 'Al jaren werken we samen met BuildCraft voor onze renovatieprojecten. Altijd op tijd en binnen budget.',
        textEn: 'We have been working with BuildCraft for years for our renovation projects. Always on time and within budget.',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Maria+Jansen&background=0D8ABC&color=fff',
        featured: true
      },
      {
        name: 'Peter Bakker',
        company: 'Bakker Horeca',
        companyEn: 'Bakker Catering',
        text: 'Ons restaurant is prachtig verbouwd door BuildCraft. Professioneel team en uitstekend resultaat!',
        textEn: 'Our restaurant was beautifully renovated by BuildCraft. Professional team and excellent result!',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Peter+Bakker&background=0D8ABC&color=fff',
        featured: true
      }
    ];

    for (const testimonial of testimonials) {
      await db.insert(schema.testimonials).values(testimonial).onConflictDoNothing();
      console.log(`  ✅ Added: ${testimonial.name}`);
    }

    // 4. Add Partners
    console.log('\n🤝 Adding partners...');
    const partners = [
      {
        name: 'BAM Bouw',
        logo: 'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=BAM+Bouw',
        website: 'https://www.bam.com',
        featured: true
      },
      {
        name: 'Dura Vermeer',
        logo: 'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=Dura+Vermeer',
        website: 'https://www.duravermeer.nl',
        featured: true
      },
      {
        name: 'VolkerWessels',
        logo: 'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=VolkerWessels',
        website: 'https://www.volkerwessels.com',
        featured: true
      }
    ];

    for (const partner of partners) {
      await db.insert(schema.partners).values(partner).onConflictDoNothing();
      console.log(`  ✅ Added: ${partner.name}`);
    }

    console.log('\n✅ All content added successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Services: ${services.length}`);
    console.log(`  - Projects: ${projects.length}`);
    console.log(`  - Testimonials: ${testimonials.length}`);
    console.log(`  - Partners: ${partners.length}`);
    
  } catch (error) {
    console.error('❌ Error adding content:', error);
    throw error;
  } finally {
    await client.end();
  }
}

addConstructionContent();
