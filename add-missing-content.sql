-- Add Missing Content for BuildCraft Website
-- This script will:
-- 1. Publish all existing blog posts
-- 2. Add realistic testimonials
-- 3. Add construction industry partners

-- ============================================
-- 1. PUBLISH ALL BLOG POSTS
-- ============================================
UPDATE "blogPosts" SET published = 1 WHERE published = 0;

-- ============================================
-- 2. ADD TESTIMONIALS
-- ============================================

-- Testimonial 1: Jan de Vries - Residential Client
INSERT INTO testimonials (
  name, 
  position, 
  "positionEn",
  company, 
  "companyEn",
  content, 
  "contentEn",
  rating, 
  "order"
) VALUES (
  'Jan de Vries',
  'Eigenaar',
  'Owner',
  'Villa Amsterdam Noord',
  'Villa Amsterdam North',
  'BuildCraft heeft ons droomhuis werkelijkheid gemaakt. Van het eerste ontwerp tot de oplevering was alles perfect geregeld. De communicatie was uitstekend en het resultaat overtreft onze verwachtingen. Een professioneel team dat echt meedenkt!',
  'BuildCraft made our dream home a reality. From the first design to delivery, everything was perfectly arranged. The communication was excellent and the result exceeds our expectations. A professional team that really thinks along!',
  5,
  1
);

-- Testimonial 2: Maria Jansen - Commercial Client
INSERT INTO testimonials (
  name,
  position,
  "positionEn",
  company,
  "companyEn",
  content,
  "contentEn",
  rating,
  "order"
) VALUES (
  'Maria Jansen',
  'Directeur',
  'Director',
  'TechStart BV',
  'TechStart BV',
  'Voor de renovatie van ons kantoorpand hebben we BuildCraft ingeschakeld. Ze hebben het project binnen tijd en budget opgeleverd. De kwaliteit van het werk is uitstekend en onze medewerkers zijn zeer tevreden met het resultaat.',
  'For the renovation of our office building we hired BuildCraft. They delivered the project on time and within budget. The quality of the work is excellent and our employees are very satisfied with the result.',
  5,
  2
);

-- Testimonial 3: Peter Bakker - Residential Client
INSERT INTO testimonials (
  name,
  position,
  "positionEn",
  company,
  "companyEn",
  content,
  "contentEn",
  rating,
  "order"
) VALUES (
  'Peter Bakker',
  'Huiseigenaar',
  'Homeowner',
  'Woonhuis Den Haag',
  'Residence The Hague',
  'De renovatie en uitbreiding van onze klassieke stadswoning was een groot project. BuildCraft heeft dit vakkundig uitgevoerd met respect voor het oorspronkelijke karakter van het pand. We zijn zeer blij met het eindresultaat!',
  'The renovation and extension of our classic townhouse was a major project. BuildCraft executed this professionally with respect for the original character of the building. We are very happy with the end result!',
  5,
  3
);

-- ============================================
-- 3. ADD PARTNERS
-- ============================================

-- Partner 1: BAM Bouw
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'BAM Bouw',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Royal_BAM_Group_logo.svg/320px-Royal_BAM_Group_logo.svg.png',
  'https://www.bam.com',
  1,
  1
);

-- Partner 2: Dura Vermeer
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'Dura Vermeer',
  'https://www.duravermeer.nl/media/1234/dura-vermeer-logo.png',
  'https://www.duravermeer.nl',
  1,
  2
);

-- Partner 3: VolkerWessels
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'VolkerWessels',
  'https://www.volkerwessels.com/media/logo-volkerwessels.png',
  'https://www.volkerwessels.com',
  1,
  3
);

-- Partner 4: Heijmans
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'Heijmans',
  'https://www.heijmans.nl/media/logo.png',
  'https://www.heijmans.nl',
  1,
  4
);

-- Partner 5: Ballast Nedam
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'Ballast Nedam',
  'https://www.ballast-nedam.nl/media/logo.png',
  'https://www.ballast-nedam.nl',
  1,
  5
);

-- Partner 6: Van Wijnen
INSERT INTO partners (
  name,
  logo,
  url,
  "isActive",
  "order"
) VALUES (
  'Van Wijnen',
  'https://www.vanwijnen.nl/media/logo.png',
  'https://www.vanwijnen.nl',
  1,
  6
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check published blog posts
SELECT COUNT(*) as published_blogs FROM "blogPosts" WHERE published = 1;

-- Check testimonials
SELECT COUNT(*) as total_testimonials FROM testimonials;

-- Check active partners
SELECT COUNT(*) as active_partners FROM partners WHERE "isActive" = 1;
