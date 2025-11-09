// Seed data endpoint for populating blog posts, testimonials, and partners
import * as db from './db';

export async function seedBlogPosts() {
  console.log('[Seed] Starting blog posts seeding...');
  
  const blogPosts = [
    {
      title: "Trends in Modern Bouwontwerp 2024",
      titleEn: "Trends in Modern Construction Design 2024",
      slug: "trends-modern-bouwontwerp-2024",
      excerpt: "Ontdek de nieuwste trends in modern bouwontwerp voor 2024. Van duurzame materialen tot slimme technologie.",
      excerptEn: "Discover the latest trends in modern construction design for 2024. From sustainable materials to smart technology.",
      content: `<h2>De Toekomst van Bouwen</h2>
<p>Het jaar 2024 brengt spannende nieuwe trends in de bouwwereld. Hier zijn de belangrijkste ontwikkelingen:</p>
<h3>1. Duurzaamheid Voorop</h3>
<p>Duurzaam bouwen is niet langer een optie, maar een noodzaak. Energieneutrale woningen en circulaire bouwmaterialen worden de standaard.</p>
<h3>2. Slimme Technologie</h3>
<p>Smart home technologie wordt geïntegreerd vanaf de ontwerpfase. Denk aan geautomatiseerde klimaatbeheersing en energiebeheer.</p>
<h3>3. Flexibele Ruimtes</h3>
<p>Moderne woningen zijn ontworpen met flexibiliteit in gedachten. Multifunctionele ruimtes die mee kunnen groeien met de bewoners.</p>`,
      contentEn: `<h2>The Future of Building</h2>
<p>The year 2024 brings exciting new trends in the construction world. Here are the key developments:</p>
<h3>1. Sustainability First</h3>
<p>Sustainable building is no longer an option, but a necessity. Energy-neutral homes and circular building materials are becoming the standard.</p>
<h3>2. Smart Technology</h3>
<p>Smart home technology is integrated from the design phase. Think automated climate control and energy management.</p>
<h3>3. Flexible Spaces</h3>
<p>Modern homes are designed with flexibility in mind. Multifunctional spaces that can grow with the residents.</p>`,
      image: "/images/blog/modern-design-trends.png",
      category: "Trends",
      categoryEn: "Trends",
      authorId: 1,
      published: true,
    },
    {
      title: "Renoveren of Nieuwbouw? Maak de Juiste Keuze",
      titleEn: "Renovate or New Construction? Make the Right Choice",
      slug: "renoveren-of-nieuwbouw",
      excerpt: "Een complete gids om te bepalen of renovatie of nieuwbouw de beste keuze is voor uw project.",
      excerptEn: "A complete guide to determine whether renovation or new construction is the best choice for your project.",
      content: `<h2>De Grote Vraag</h2>
<p>Staat u voor de keuze tussen renoveren of nieuwbouw? Deze beslissing heeft grote impact op uw budget, tijdlijn en eindresultaat.</p>
<h3>Voordelen van Renovatie</h3>
<ul>
<li>Behoud van karakteristieke elementen</li>
<li>Vaak lagere kosten</li>
<li>Snellere realisatie</li>
<li>Minder impact op de omgeving</li>
</ul>
<h3>Voordelen van Nieuwbouw</h3>
<ul>
<li>Volledig naar eigen wens</li>
<li>Moderne energieprestaties</li>
<li>Geen verrassingen tijdens bouw</li>
<li>Langere garantie</li>
</ul>`,
      contentEn: `<h2>The Big Question</h2>
<p>Are you faced with the choice between renovation or new construction? This decision has a major impact on your budget, timeline and end result.</p>
<h3>Benefits of Renovation</h3>
<ul>
<li>Preservation of characteristic elements</li>
<li>Often lower costs</li>
<li>Faster realization</li>
<li>Less impact on the environment</li>
</ul>
<h3>Benefits of New Construction</h3>
<ul>
<li>Completely to your own wishes</li>
<li>Modern energy performance</li>
<li>No surprises during construction</li>
<li>Longer warranty</li>
</ul>`,
      image: "/images/blog/renovation-vs-new.jpg",
      category: "Advies",
      categoryEn: "Advice",
      authorId: 1,
      published: true,
    },
    {
      title: "5 Tips voor Duurzaam Bouwen",
      titleEn: "5 Tips for Sustainable Building",
      slug: "tips-duurzaam-bouwen",
      excerpt: "Praktische tips om uw bouwproject duurzamer en energiezuiniger te maken.",
      excerptEn: "Practical tips to make your construction project more sustainable and energy-efficient.",
      content: `<h2>Duurzaam Bouwen in de Praktijk</h2>
<p>Duurzaam bouwen hoeft niet ingewikkeld te zijn. Met deze 5 tips maakt u uw project direct duurzamer:</p>
<h3>1. Goede Isolatie</h3>
<p>Investeer in hoogwaardige isolatie. Dit bespaart op lange termijn veel energie en kosten.</p>
<h3>2. Zonnepanelen</h3>
<p>Zonnepanelen zijn nu betaalbaarder dan ooit en verdienen zichzelf snel terug.</p>
<h3>3. Duurzame Materialen</h3>
<p>Kies voor FSC-gecertificeerd hout en gerecyclede materialen waar mogelijk.</p>
<h3>4. Waterbesparende Voorzieningen</h3>
<p>Installeer waterbesparende kranen en douches, en overweeg een regenwateropvangsysteem.</p>
<h3>5. Warmteterugwinning</h3>
<p>Een WTW-systeem zorgt voor verse lucht zonder warmteverlies.</p>`,
      contentEn: `<h2>Sustainable Building in Practice</h2>
<p>Sustainable building doesn't have to be complicated. With these 5 tips, you can make your project more sustainable right away:</p>
<h3>1. Good Insulation</h3>
<p>Invest in high-quality insulation. This saves a lot of energy and costs in the long run.</p>
<h3>2. Solar Panels</h3>
<p>Solar panels are now more affordable than ever and pay for themselves quickly.</p>
<h3>3. Sustainable Materials</h3>
<p>Choose FSC-certified wood and recycled materials where possible.</p>
<h3>4. Water-Saving Facilities</h3>
<p>Install water-saving taps and showers, and consider a rainwater harvesting system.</p>
<h3>5. Heat Recovery</h3>
<p>A heat recovery ventilation system provides fresh air without heat loss.</p>`,
      image: "/images/blog/sustainable-building.jpeg",
      category: "Duurzaamheid",
      categoryEn: "Sustainability",
      authorId: 1,
      published: true,
    },
  ];

  for (const post of blogPosts) {
    try {
      await db.createBlogPost(post);
      console.log(`[Seed] ✅ Created blog post: ${post.title}`);
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        console.log(`[Seed] ⚠️  Blog post already exists: ${post.title}`);
      } else {
        console.error(`[Seed] ❌ Failed to create blog post: ${post.title}`, error);
      }
    }
  }

  console.log('[Seed] Blog posts seeding complete!');
}

export async function seedTestimonials() {
  console.log('[Seed] Starting testimonials seeding...');
  
  const testimonials = [
    {
      name: "Jan de Vries",
      position: "Particulier",
      positionEn: "Private",
      company: "Villa Amsterdam Noord",
      companyEn: "Villa Amsterdam Noord",
      content: "BuildCraft heeft ons droomhuis werkelijkheid gemaakt. De aandacht voor detail en vakmanschap zijn ongeëvenaard. Zeer tevreden!",
      contentEn: "BuildCraft made our dream home a reality. The attention to detail and craftsmanship are unmatched. Very satisfied!",
      rating: 5,
      image: "/images/testimonials/jan.jpg",
      order: 1,
    },
    {
      name: "Maria Jansen",
      position: "Directeur",
      positionEn: "Director",
      company: "TechStart BV",
      companyEn: "TechStart BV",
      content: "Professionele aanpak van A tot Z. Ons kantoorpand is prachtig gerenoveerd en precies zoals we het wilden. Aanrader!",
      contentEn: "Professional approach from A to Z. Our office building has been beautifully renovated and exactly as we wanted. Highly recommended!",
      rating: 5,
      image: "/images/testimonials/maria.jpg",
      order: 2,
    },
    {
      name: "Peter Bakker",
      position: "Particulier",
      positionEn: "Private",
      company: "Woonhuis Den Haag",
      companyEn: "Residence The Hague",
      content: "Uitstekende communicatie en kwaliteit. De renovatie van onze klassieke stadswoning is perfect uitgevoerd. Top team!",
      contentEn: "Excellent communication and quality. The renovation of our classic townhouse was perfectly executed. Top team!",
      rating: 5,
      image: "/images/testimonials/peter.jpg",
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    try {
      await db.createTestimonial(testimonial);
      console.log(`[Seed] ✅ Created testimonial: ${testimonial.name}`);
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        console.log(`[Seed] ⚠️  Testimonial already exists: ${testimonial.name}`);
      } else {
        console.error(`[Seed] ❌ Failed to create testimonial: ${testimonial.name}`, error);
      }
    }
  }

  console.log('[Seed] Testimonials seeding complete!');
}

export async function seedPartners() {
  console.log('[Seed] Starting partners seeding...');
  
  const partners = [
    { name: "BAM Bouw", logo: "/images/partners/bam.png", url: "https://www.bam.com", isActive: 1, order: 1 },
    { name: "Dura Vermeer", logo: "/images/partners/dura-vermeer.png", url: "https://www.duravermeer.nl", isActive: 1, order: 2 },
    { name: "VolkerWessels", logo: "/images/partners/volkerwessels.png", url: "https://www.volkerwessels.com", isActive: 1, order: 3 },
    { name: "Heijmans", logo: "/images/partners/heijmans.png", url: "https://www.heijmans.nl", isActive: 1, order: 4 },
    { name: "Ballast Nedam", logo: "/images/partners/ballast-nedam.png", url: "https://www.ballast-nedam.nl", isActive: 1, order: 5 },
    { name: "Van Wijnen", logo: "/images/partners/van-wijnen.png", url: "https://www.vanwijnen.nl", isActive: 1, order: 6 },
  ];

  for (const partner of partners) {
    try {
      await db.createPartner(partner);
      console.log(`[Seed] ✅ Created partner: ${partner.name}`);
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        console.log(`[Seed] ⚠️  Partner already exists: ${partner.name}`);
      } else {
        console.error(`[Seed] ❌ Failed to create partner: ${partner.name}`, error);
      }
    }
  }

  console.log('[Seed] Partners seeding complete!');
}

export async function seedAll() {
  console.log('[Seed] ========================================');
  console.log('[Seed] Starting database seeding...');
  console.log('[Seed] ========================================');
  
  await seedBlogPosts();
  await seedTestimonials();
  await seedPartners();
  
  console.log('[Seed] ========================================');
  console.log('[Seed] Database seeding complete!');
  console.log('[Seed] ========================================');
}
