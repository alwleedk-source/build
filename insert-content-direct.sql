-- Insert Dutch construction company content directly

-- Services
INSERT INTO "services" (
  "title", "titleEn", "slug", "description", "descriptionEn", 
  "longDescription", "longDescriptionEn", "icon", "features", "featuresEn", 
  "showOnHomepage", "order"
) VALUES
(
  'Nieuwbouw',
  'New Construction',
  'nieuwbouw',
  'Professionele nieuwbouwprojecten voor woningen en bedrijfspanden. Van ontwerp tot oplevering verzorgen wij het complete bouwproces.',
  'Professional new construction projects for residential and commercial buildings. From design to delivery, we take care of the complete construction process.',
  'Wij realiseren nieuwbouwprojecten van A tot Z. Of het nu gaat om een moderne villa, een appartementencomplex of een bedrijfspand, ons ervaren team zorgt voor een vlekkeloze uitvoering. We werken volgens de nieuwste bouwvoorschriften en gebruiken duurzame materialen voor een toekomstbestendig resultaat.',
  'We realize new construction projects from A to Z. Whether it''s a modern villa, an apartment complex or a commercial building, our experienced team ensures flawless execution. We work according to the latest building regulations and use sustainable materials for a future-proof result.',
  '🏗️',
  '["Compleet bouwproces","Duurzame materialen","Moderne technieken","Vaste opleverdatum"]',
  '["Complete construction process","Sustainable materials","Modern techniques","Fixed delivery date"]',
  1, 1
),
(
  'Renovatie',
  'Renovation',
  'renovatie',
  'Vakkundige renovatie van woningen en bedrijfspanden. Wij geven uw pand een nieuwe uitstraling met respect voor het bestaande.',
  'Professional renovation of residential and commercial buildings. We give your property a new look with respect for the existing structure.',
  'Van kleine aanpassingen tot complete renovaties - wij hebben de expertise om uw pand te transformeren. We combineren vakmanschap met moderne technieken en zorgen voor minimale overlast tijdens de werkzaamheden.',
  'From small adjustments to complete renovations - we have the expertise to transform your property. We combine craftsmanship with modern techniques and ensure minimal inconvenience during the work.',
  '🔨',
  '["Stijlvolle verbouwingen","Minimale overlast","Energiebesparend","Waardeverhoging"]',
  '["Stylish renovations","Minimal inconvenience","Energy-saving","Value increase"]',
  1, 2
),
(
  'Afwerking',
  'Finishing',
  'afwerking',
  'Hoogwaardige afwerking voor binnen en buiten. Van stucwerk tot tegelwerk, wij zorgen voor een perfecte finish.',
  'High-quality finishing for interior and exterior. From plastering to tiling, we ensure a perfect finish.',
  'De afwerking maakt het verschil. Ons team van specialisten zorgt voor een vlekkeloze afwerking van uw project. We werken met de beste materialen en technieken voor een duurzaam en esthetisch resultaat.',
  'The finish makes the difference. Our team of specialists ensures a flawless finish of your project. We work with the best materials and techniques for a durable and aesthetic result.',
  '🎨',
  '["Stucwerk","Tegelwerk","Schilderwerk","Vloeren"]',
  '["Plastering","Tiling","Painting","Flooring"]',
  1, 3
),
(
  'Onderhoud',
  'Maintenance',
  'onderhoud',
  'Regelmatig onderhoud voorkomt grote kosten. Wij verzorgen het complete onderhoud van uw pand.',
  'Regular maintenance prevents major costs. We take care of the complete maintenance of your property.',
  'Preventief onderhoud is essentieel voor het behoud van uw pand. We bieden onderhoudscontracten op maat en zorgen ervoor dat uw gebouw in optimale staat blijft. Van kleine reparaties tot groot onderhoud.',
  'Preventive maintenance is essential for preserving your property. We offer customized maintenance contracts and ensure that your building remains in optimal condition. From small repairs to major maintenance.',
  '🔧',
  '["Onderhoudscontracten","Snelle service","Preventief onderhoud","Reparaties"]',
  '["Maintenance contracts","Fast service","Preventive maintenance","Repairs"]',
  1, 4
)
ON CONFLICT (slug) DO NOTHING;

-- Projects
INSERT INTO "projects" (
  "title", "titleEn", "description", "descriptionEn", "category", "categoryEn",
  "image", "featured", "showOnHomepage", "order"
) VALUES
(
  'Villa Amsterdam Noord',
  'Villa Amsterdam North',
  'Moderne villa met duurzame materialen en energiezuinige installaties.',
  'Modern villa with sustainable materials and energy-efficient installations.',
  'Residentieel',
  'Residential',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  1, 1, 1
),
(
  'Kantoorpand Rotterdam',
  'Office Building Rotterdam',
  'Complete renovatie van kantoorpand met moderne uitstraling.',
  'Complete renovation of office building with modern appearance.',
  'Commercieel',
  'Commercial',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  1, 1, 2
),
(
  'Appartementencomplex Utrecht',
  'Apartment Complex Utrecht',
  'Nieuwbouw van 24 luxe appartementen in het centrum van Utrecht.',
  'New construction of 24 luxury apartments in the center of Utrecht.',
  'Residentieel',
  'Residential',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  1, 1, 3
),
(
  'Woonhuis Den Haag',
  'Residence The Hague',
  'Volledige renovatie en uitbreiding van klassieke stadswoning.',
  'Complete renovation and extension of classic townhouse.',
  'Industrieel',
  'Industrial',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  0, 0, 4
);

-- Testimonials
INSERT INTO "testimonials" (
  "name", "position", "positionEn", "company", "content", "contentEn", 
  "image", "rating", "featured", "order"
) VALUES
(
  'Jan de Vries',
  'Particulier',
  'Private',
  'Particulier',
  'BuildCraft heeft onze droomvilla perfect gerealiseerd. Vakmanschap en service van het hoogste niveau!',
  'BuildCraft perfectly realized our dream villa. Craftsmanship and service of the highest level!',
  'https://ui-avatars.com/api/?name=Jan+de+Vries&background=0D8ABC&color=fff',
  5, true, 1
),
(
  'Maria Jansen',
  'Eigenaar',
  'Owner',
  'Jansen Vastgoed',
  'Al jaren werken we samen met BuildCraft voor onze renovatieprojecten. Altijd op tijd en binnen budget.',
  'We have been working with BuildCraft for years for our renovation projects. Always on time and within budget.',
  'https://ui-avatars.com/api/?name=Maria+Jansen&background=0D8ABC&color=fff',
  5, true, 2
),
(
  'Peter Bakker',
  'Eigenaar',
  'Owner',
  'Bakker Horeca',
  'Ons restaurant is prachtig verbouwd door BuildCraft. Professioneel team en uitstekend resultaat!',
  'Our restaurant was beautifully renovated by BuildCraft. Professional team and excellent result!',
  'https://ui-avatars.com/api/?name=Peter+Bakker&background=0D8ABC&color=fff',
  5, true, 3
);

-- Partners
INSERT INTO "partners" (
  "name", "logo", "website", "description", "descriptionEn", "featured", "order"
) VALUES
(
  'BAM Bouw',
  'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=BAM+Bouw',
  'https://www.bam.com',
  'Toonaangevend bouwbedrijf',
  'Leading construction company',
  true, 1
),
(
  'Dura Vermeer',
  'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=Dura+Vermeer',
  'https://www.duravermeer.nl',
  'Innovatief in bouw en vastgoed',
  'Innovative in construction and real estate',
  true, 2
),
(
  'VolkerWessels',
  'https://via.placeholder.com/200x80/0D8ABC/FFFFFF?text=VolkerWessels',
  'https://www.volkerwessels.com',
  'Duurzaam bouwen aan Nederland',
  'Sustainable construction in the Netherlands',
  true, 3
);
