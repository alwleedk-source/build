import postgres from 'postgres';

const DATABASE_URL = 'postgresql://postgres:oyxKbUhdabHyXSzkRwINQAXnAenybElr@trolley.proxy.rlwy.net:36394/railway';

async function addBlogPosts() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('📝 Adding blog posts...\n');

    const blogPosts = [
      {
        title: '5 Tips voor Duurzaam Bouwen',
        titleEn: '5 Tips for Sustainable Construction',
        slug: '5-tips-voor-duurzaam-bouwen',
        excerpt: 'Ontdek hoe u uw bouwproject duurzamer kunt maken met deze praktische tips.',
        excerptEn: 'Discover how to make your construction project more sustainable with these practical tips.',
        content: `
# 5 Tips voor Duurzaam Bouwen

Duurzaam bouwen wordt steeds belangrijker in de bouwsector. Hier zijn vijf praktische tips om uw project duurzamer te maken:

## 1. Kies voor duurzame materialen
Gebruik gerecyclede of hernieuwbare materialen waar mogelijk.

## 2. Energiezuinige installaties
Investeer in moderne, energiezuinige verwarmings- en koelsystemen.

## 3. Goede isolatie
Zorg voor optimale isolatie om energieverlies te minimaliseren.

## 4. Zonnepanelen
Overweeg de installatie van zonnepanelen voor duurzame energie.

## 5. Waterbesparende oplossingen
Gebruik waterbesparende kranen en toiletten.

Neem contact met ons op voor meer advies over duurzaam bouwen!
        `,
        contentEn: `
# 5 Tips for Sustainable Construction

Sustainable construction is becoming increasingly important in the building sector. Here are five practical tips to make your project more sustainable:

## 1. Choose sustainable materials
Use recycled or renewable materials where possible.

## 2. Energy-efficient installations
Invest in modern, energy-efficient heating and cooling systems.

## 3. Good insulation
Ensure optimal insulation to minimize energy loss.

## 4. Solar panels
Consider installing solar panels for sustainable energy.

## 5. Water-saving solutions
Use water-saving taps and toilets.

Contact us for more advice on sustainable construction!
        `,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        category: 'Duurzaamheid',
        categoryEn: 'Sustainability',
        published: true,
        order: 1
      },
      {
        title: 'Renoveren of Nieuwbouw? Maak de Juiste Keuze',
        titleEn: 'Renovate or New Construction? Make the Right Choice',
        slug: 'renoveren-of-nieuwbouw',
        excerpt: 'Twijfelt u tussen renoveren en nieuwbouw? Wij helpen u de beste keuze te maken.',
        excerptEn: 'Unsure between renovation and new construction? We help you make the best choice.',
        content: `
# Renoveren of Nieuwbouw?

Het is een vraag die veel eigenaren zich stellen: renoveren of nieuwbouw? Beide opties hebben voor- en nadelen.

## Voordelen van Renoveren
- Behoud van karakteristieke elementen
- Vaak sneller dan nieuwbouw
- Kan kosteneffectiever zijn

## Voordelen van Nieuwbouw
- Volledig naar eigen wens ontwerpen
- Moderne, energiezuinige oplossingen
- Geen verborgen gebreken

## Onze Expertise
Met meer dan 15 jaar ervaring helpen wij u de juiste keuze te maken voor uw situatie.

Neem contact op voor een vrijblijvend adviesgesprek!
        `,
        contentEn: `
# Renovate or New Construction?

It's a question many owners ask themselves: renovate or new construction? Both options have pros and cons.

## Advantages of Renovation
- Preservation of characteristic elements
- Often faster than new construction
- Can be more cost-effective

## Advantages of New Construction
- Fully customizable design
- Modern, energy-efficient solutions
- No hidden defects

## Our Expertise
With over 15 years of experience, we help you make the right choice for your situation.

Contact us for a no-obligation consultation!
        `,
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        category: 'Advies',
        categoryEn: 'Advice',
        published: true,
        order: 2
      },
      {
        title: 'Trends in Modern Bouwontwerp 2024',
        titleEn: 'Trends in Modern Construction Design 2024',
        slug: 'trends-modern-bouwontwerp-2024',
        excerpt: 'Blijf op de hoogte van de nieuwste trends in bouwontwerp en architectuur.',
        excerptEn: 'Stay up to date with the latest trends in construction design and architecture.',
        content: `
# Trends in Modern Bouwontwerp 2024

De bouwwereld evolueert constant. Dit zijn de belangrijkste trends voor 2024:

## 1. Biofiele Architectuur
Integratie van natuurlijke elementen in het ontwerp.

## 2. Smart Home Technologie
Volledig geïntegreerde slimme systemen.

## 3. Flexibele Ruimtes
Multifunctionele kamers die meegroeien met uw behoeften.

## 4. Duurzame Materialen
Focus op milieuvriendelijke en hernieuwbare materialen.

## 5. Minimalisme
Strakke lijnen en functioneel design.

Wilt u deze trends toepassen in uw project? Neem contact op!
        `,
        contentEn: `
# Trends in Modern Construction Design 2024

The construction world is constantly evolving. These are the main trends for 2024:

## 1. Biophilic Architecture
Integration of natural elements in design.

## 2. Smart Home Technology
Fully integrated smart systems.

## 3. Flexible Spaces
Multifunctional rooms that grow with your needs.

## 4. Sustainable Materials
Focus on eco-friendly and renewable materials.

## 5. Minimalism
Clean lines and functional design.

Want to apply these trends in your project? Contact us!
        `,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        category: 'Trends',
        categoryEn: 'Trends',
        published: true,
        order: 3
      }
    ];

    for (const post of blogPosts) {
      await sql`
        INSERT INTO "blogPosts" (
          title, "titleEn", slug, excerpt, "excerptEn", content, "contentEn",
          image, category, "categoryEn", published, "order", "createdAt", "updatedAt"
        ) VALUES (
          ${post.title}, ${post.titleEn}, ${post.slug}, ${post.excerpt}, ${post.excerptEn},
          ${post.content}, ${post.contentEn}, ${post.image}, ${post.category}, ${post.categoryEn},
          ${post.published}, ${post.order}, NOW(), NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`✅ Added: ${post.title}`);
    }

    console.log('\n🎉 All blog posts added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sql.end();
  }
}

addBlogPosts();
