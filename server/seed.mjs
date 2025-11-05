import { drizzle } from "drizzle-orm/mysql2";
import { projects, services } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Projects data
const projectsData = [
  {
    title: "Moderne Villa Amsterdam",
    description: "Luxe villa met duurzame materialen en moderne architectuur.",
    category: "Residentieel",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Kantoorgebouw Rotterdam",
    description: "Complete renovatie van historisch kantoorpand.",
    category: "Commercieel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Appartementencomplex Utrecht",
    description: "Energieneutraal complex met 50 appartementen.",
    category: "Residentieel",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Fabriek Den Haag",
    description: "Moderne productiefaciliteit met duurzame energie.",
    category: "Industrieel",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Winkelcentrum Eindhoven",
    description: "Renovatie en uitbreiding van winkelcentrum.",
    category: "Commercieel",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a336d?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Luxe Penthouse Amsterdam",
    description: "Exclusief penthouse met panoramisch uitzicht.",
    category: "Residentieel",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
    featured: 1,
  },
  {
    title: "Bedrijfspand Almere",
    description: "Nieuwbouw kantoor met moderne faciliteiten.",
    category: "Commercieel",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    featured: 0,
  },
  {
    title: "Woonwijk Groningen",
    description: "Duurzame nieuwbouwwijk met 120 woningen.",
    category: "Residentieel",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    featured: 0,
  },
  {
    title: "Magazijn Tilburg",
    description: "Logistiek centrum met hoogwaardige voorzieningen.",
    category: "Industrieel",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    featured: 0,
  },
  {
    title: "Zorgcentrum Maastricht",
    description: "Modern zorgcomplex met 200 appartementen.",
    category: "Commercieel",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    featured: 0,
  },
  {
    title: "Villa Zeeland",
    description: "Exclusieve strandvilla met zwembad.",
    category: "Residentieel",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    featured: 0,
  },
  {
    title: "Productiehal Breda",
    description: "Industriële hal met kantoorruimte.",
    category: "Industrieel",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop",
    featured: 0,
  },
];

// Services data
const servicesData = [
  {
    title: "Nieuwbouw",
    slug: "nieuwbouw",
    description: "Complete nieuwbouwprojecten van fundering tot afwerking. Wij realiseren uw droomhuis met aandacht voor detail en kwaliteit.",
    longDescription: "Bij BuildCraft realiseren wij complete nieuwbouwprojecten van A tot Z. Van de eerste schets tot de sleuteloverdracht begeleiden wij u in elk stadium van het bouwproces. Onze ervaren projectmanagers zorgen ervoor dat uw droomhuis precies wordt zoals u het voor ogen heeft.",
    icon: "Hammer",
    features: JSON.stringify([
      "Architectonisch ontwerp op maat",
      "Volledige projectbegeleiding",
      "Duurzame materialen en technieken",
      "Energiezuinige oplossingen",
      "Transparante communicatie",
      "Vaste opleverdatum"
    ]),
    showOnHomepage: 1,
  },
  {
    title: "Renovatie",
    slug: "renovatie",
    description: "Verbouw en renovatie van bestaande gebouwen. Van kleine aanpassingen tot complete transformaties.",
    longDescription: "Geef uw bestaande woning of bedrijfspand een nieuwe uitstraling met onze renovatiediensten. Of het nu gaat om een badkamer, keuken of een complete verbouwing, wij zorgen voor een vakkundige uitvoering met minimale overlast.",
    icon: "Wrench",
    features: JSON.stringify([
      "Gratis adviesgesprek en offerte",
      "Minimale overlast tijdens werkzaamheden",
      "Behoud van authentieke elementen",
      "Moderne technieken en materialen",
      "Garantie op alle werkzaamheden",
      "Flexibele planning"
    ]),
    showOnHomepage: 1,
  },
  {
    title: "Afwerking",
    slug: "afwerking",
    description: "Professionele afwerking en finishing touches. Stucwerk, schilderwerk en decoratieve elementen.",
    longDescription: "De afwerking maakt het verschil tussen een goed en een perfect project. Onze specialisten zorgen voor een vlekkeloze afwerking van stucwerk, schilderwerk en alle decoratieve elementen.",
    icon: "Paintbrush",
    features: JSON.stringify([
      "Hoogwaardig stucwerk",
      "Professioneel schilderwerk",
      "Decoratieve afwerking",
      "Kleuradvies op maat",
      "Snelle en nette uitvoering",
      "Garantie op materiaal en arbeid"
    ]),
    showOnHomepage: 1,
  },
  {
    title: "Onderhoud",
    slug: "onderhoud",
    description: "Regelmatig onderhoud en reparaties. Wij zorgen ervoor dat uw gebouw in topconditie blijft.",
    longDescription: "Preventief onderhoud voorkomt grote problemen en hoge kosten. Met onze onderhoudscontracten zorgen wij dat uw pand altijd in optimale staat verkeert.",
    icon: "Shield",
    features: JSON.stringify([
      "Preventief onderhoud",
      "Snelle reparatieservice",
      "24/7 storingsdienst",
      "Onderhoudscontracten op maat",
      "Ervaren vakspecialisten",
      "Vaste contactpersoon"
    ]),
    showOnHomepage: 1,
  },
  {
    title: "Commerciële Bouw",
    slug: "commerciele-bouw",
    description: "Kantoorgebouwen, winkels en bedrijfspanden. Professionele bouwoplossingen voor het bedrijfsleven.",
    longDescription: "BuildCraft heeft ruime ervaring in commerciële bouwprojecten. Van kantoorgebouwen tot winkelcentra, wij realiseren functionele en representatieve bedrijfspanden die perfect aansluiten bij uw bedrijfsvoering.",
    icon: "Building2",
    features: JSON.stringify([
      "Functioneel ontwerp",
      "Snelle realisatie",
      "Minimale bedrijfsverstoring",
      "Duurzame oplossingen",
      "Flexibele indeling",
      "Toekomstbestendig"
    ]),
    showOnHomepage: 0,
  },
  {
    title: "Industriële Bouw",
    slug: "industriele-bouw",
    description: "Fabrieken, magazijnen en productieruimtes. Robuuste bouwoplossingen voor de industrie.",
    longDescription: "Voor industriële bouwprojecten heeft u een partner nodig die begrijpt wat er komt kijken bij grootschalige, functionele bouw. BuildCraft heeft de expertise en middelen om uw industriële project succesvol te realiseren.",
    icon: "Factory",
    features: JSON.stringify([
      "Grote overspanningen mogelijk",
      "Hoogwaardige vloeren",
      "Optimale logistieke routing",
      "Energiezuinige installaties",
      "Veiligheid voorop",
      "Snelle bouwmethoden"
    ]),
    showOnHomepage: 0,
  },
];

async function seed() {
  console.log("🌱 Starting seed...");

  try {
    // Insert projects
    console.log("📦 Seeding projects...");
    await db.insert(projects).values(projectsData);
    console.log(`✅ Inserted ${projectsData.length} projects`);

    // Insert services
    console.log("🔧 Seeding services...");
    await db.insert(services).values(servicesData);
    console.log(`✅ Inserted ${servicesData.length} services`);

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
