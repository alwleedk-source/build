import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { projects, services, blogPosts, testimonials, teamMembers, contactMessages, siteSettings } from '../drizzle/schema';

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await db.delete(projects);
  await db.delete(services);
  await db.delete(blogPosts);
  await db.delete(testimonials);
  await db.delete(teamMembers);
  await db.delete(contactMessages);
  await db.delete(siteSettings);

  // Seed Projects
  console.log('📦 Seeding projects...');
  const projectsData: Array<{
    title: string;
    category: 'Residentieel' | 'Commercieel' | 'Industrieel';
    description: string;
    image: string;
    featured: number;
    showOnHomepage: number;
    order: number;
  }> = [
    {
      title: 'Moderne Villa Amsterdam',
      category: 'Residentieel',
      description: 'Luxe villa met duurzame materialen en moderne architectuur',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 1
    },
    {
      title: 'Kantoorgebouw Rotterdam',
      category: 'Commercieel',
      description: 'Modern kantoorcomplex met 5000m² kantoorruimte',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 2
    },
    {
      title: 'Appartementencomplex Utrecht',
      category: 'Residentieel',
      description: '50 luxe appartementen in het centrum van Utrecht',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 3
    },
    {
      title: 'Fabriek Den Haag',
      category: 'Industrieel',
      description: 'Industrieel complex met 10.000m² productieruimte',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 4
    },
    {
      title: 'Winkelcentrum Eindhoven',
      category: 'Commercieel',
      description: 'Modern winkelcentrum met 80 winkels',
      image: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 5
    },
    {
      title: 'Luxe Penthouse Amsterdam',
      category: 'Residentieel',
      description: 'Exclusief penthouse met panoramisch uitzicht',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      featured: 1,
      showOnHomepage: 1,
      order: 6
    },
    {
      title: 'Bedrijfspand Almere',
      category: 'Commercieel',
      description: 'Multifunctioneel bedrijfspand met kantoor en opslag',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 7
    },
    {
      title: 'Woonwijk Haarlem',
      category: 'Residentieel',
      description: '30 eengezinswoningen in nieuwbouwwijk',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 8
    },
    {
      title: 'Logistiek Centrum Tilburg',
      category: 'Industrieel',
      description: 'Distributiecentrum met 15.000m² opslagruimte',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 9
    },
    {
      title: 'Renovatie Monumentaal Pand',
      category: 'Residentieel',
      description: 'Restauratie van 19e eeuws herenhuis',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 10
    },
    {
      title: 'Sportcomplex Groningen',
      category: 'Commercieel',
      description: 'Multifunctioneel sportcentrum met zwembad',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 11
    },
    {
      title: 'Productiehal Breda',
      category: 'Industrieel',
      description: 'Moderne productiehal met duurzame installaties',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800',
      featured: 0,
      showOnHomepage: 0,
      order: 12
    }
  ];

  for (const project of projectsData) {
    await db.insert(projects).values(project);
  }
  console.log(`✅ Seeded ${projectsData.length} projects`);

  // Seed Services
  console.log('🛠️  Seeding services...');
  const servicesData = [
    {
      title: 'Nieuwbouw',
      slug: 'nieuwbouw',
      description: 'Complete nieuwbouwprojecten van fundering tot afwerking.',
      longDescription: 'Bij BuildCraft realiseren wij complete nieuwbouwprojecten van A tot Z. Van de eerste schets tot de sleuteloverdracht begeleiden wij u in elk stadium van het bouwproces. Onze ervaren projectmanagers zorgen ervoor dat uw droomhuis precies wordt zoals u het voor ogen heeft.\n\nWij werken met de nieuwste bouwtechnieken en duurzame materialen om een energiezuinig en toekomstbestendig gebouw te realiseren. Of het nu gaat om een moderne villa, een appartementencomplex of een bedrijfspand, wij hebben de expertise om uw project tot een succes te maken.',
      icon: 'Hammer',
      features: JSON.stringify([
        'Architectonisch ontwerp op maat',
        'Volledige projectbegeleiding',
        'Duurzame materialen en technieken',
        'Energiezuinige oplossingen',
        'Transparante communicatie',
        'Vaste opleverdatum'
      ]),
      showOnHomepage: 1,
      order: 1
    },
    {
      title: 'Renovatie',
      slug: 'renovatie',
      description: 'Verbouw en renovatie van bestaande gebouwen.',
      longDescription: 'Geef uw bestaande woning of bedrijfspand een nieuwe uitstraling met onze renovatiediensten. Of het nu gaat om een badkamer, keuken of een complete verbouwing, wij zorgen voor een vakkundige uitvoering met minimale overlast.\n\nOnze specialisten hebben ruime ervaring met renovaties van monumentale panden tot moderne woningen. We respecteren de authentieke elementen en combineren deze met moderne technieken en materialen voor een optimaal resultaat.',
      icon: 'Wrench',
      features: JSON.stringify([
        'Badkamer en keuken renovaties',
        'Complete verbouwingen',
        'Monumentaal onderhoud',
        'Energiebesparende maatregelen',
        'Minimale overlast tijdens werkzaamheden',
        'Transparante planning en communicatie'
      ]),
      showOnHomepage: 1,
      order: 2
    },
    {
      title: 'Afwerking',
      slug: 'afwerking',
      description: 'Hoogwaardige afwerking voor elk project.',
      longDescription: 'De afwerking maakt het verschil tussen een goed en een perfect project. Bij BuildCraft besteden wij extra aandacht aan alle details om een hoogwaardig eindresultaat te garanderen.\n\nVan stucwerk tot tegelwerk, van schilderwerk tot vloeren - onze vakmannen zorgen voor een perfecte afwerking die jarenlang meegaat. Wij werken alleen met kwaliteitsmaterialen en ervaren vaklieden.',
      icon: 'Paintbrush',
      features: JSON.stringify([
        'Stucwerk en schilderwerk',
        'Tegelwerk en natuursteen',
        'Parket en laminaat',
        'Plafonds en wanden',
        'Sanitair installatie',
        'Kwaliteitsgarantie'
      ]),
      showOnHomepage: 1,
      order: 3
    },
    {
      title: 'Onderhoud',
      slug: 'onderhoud',
      description: 'Regelmatig onderhoud voor duurzaam behoud.',
      longDescription: 'Preventief onderhoud is essentieel voor het behoud van uw gebouw. BuildCraft biedt onderhoudscontracten op maat, zodat uw pand altijd in optimale staat blijft.\n\nVan kleine reparaties tot groot onderhoud, wij staan voor u klaar. Met onze onderhoudscontracten voorkomt u grote kosten en verlengt u de levensduur van uw gebouw aanzienlijk.',
      icon: 'Settings',
      features: JSON.stringify([
        'Periodieke inspecties',
        'Preventief onderhoud',
        'Snelle reparatieservice',
        'Onderhoudscontracten op maat',
        '24/7 storingsdienst',
        'Langetermijnplanning'
      ]),
      showOnHomepage: 1,
      order: 4
    },
    {
      title: 'Commerciële Bouw',
      slug: 'commerciele-bouw',
      description: 'Professionele bouwprojecten voor bedrijven.',
      longDescription: 'BuildCraft heeft uitgebreide ervaring met commerciële bouwprojecten. Van kantoorgebouwen tot winkelcentra, wij realiseren functionele en representatieve bedrijfspanden.\n\nWij begrijpen de specifieke eisen van commercieel vastgoed en zorgen voor een efficiënte planning en uitvoering, zodat uw bedrijf zo min mogelijk hinder ondervindt.',
      icon: 'Building2',
      features: JSON.stringify([
        'Kantoorgebouwen',
        'Winkelcentra',
        'Horeca gelegenheden',
        'Bedrijfshallen',
        'Showrooms',
        'Turn-key oplossingen'
      ]),
      showOnHomepage: 0,
      order: 5
    },
    {
      title: 'Industriële Bouw',
      slug: 'industriele-bouw',
      description: 'Gespecialiseerd in industriële bouwprojecten.',
      longDescription: 'Voor industriële bouwprojecten kunt u bij BuildCraft terecht. Wij hebben de kennis en ervaring om complexe industriële gebouwen te realiseren die voldoen aan alle technische en veiligheidseisen.\n\nOf het nu gaat om productiehallen, opslagruimtes of logistieke centra, wij zorgen voor een solide en functioneel gebouw dat perfect aansluit bij uw bedrijfsprocessen.',
      icon: 'Factory',
      features: JSON.stringify([
        'Productiehallen',
        'Opslagruimtes',
        'Logistieke centra',
        'Hoogwaardige vloeren',
        'Optimale logistieke routing',
        'Energiezuinige installaties'
      ]),
      showOnHomepage: 0,
      order: 6
    }
  ];

  for (const service of servicesData) {
    await db.insert(services).values(service);
  }
  console.log(`✅ Seeded ${servicesData.length} services`);

  // Seed Blog Posts
  console.log('📝 Seeding blog posts...');
  const blogPostsData = [
    {
      title: 'De toekomst van duurzaam bouwen',
      slug: 'toekomst-duurzaam-bouwen',
      excerpt: 'Ontdek de nieuwste trends in duurzaam bouwen en hoe BuildCraft hierop inspeelt.',
      content: 'Duurzaam bouwen is niet langer een optie, maar een noodzaak. In dit artikel bespreken wij de nieuwste ontwikkelingen op het gebied van duurzame bouwmaterialen, energiezuinige technieken en circulaire bouw.\n\nBij BuildCraft zijn wij voorloper op het gebied van duurzaam bouwen. Wij werken met gecertificeerde duurzame materialen en passen de nieuwste technieken toe om energieneutraal te bouwen.\n\nVan zonnepanelen tot warmtepompen, van groene daken tot regenwater opvang - wij integreren duurzaamheid in elk project. Zo bouwen wij niet alleen voor nu, maar ook voor de toekomst.',
      category: 'Duurzaamheid',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      published: 1
    },
    {
      title: '5 tips voor een succesvolle verbouwing',
      slug: '5-tips-succesvolle-verbouwing',
      excerpt: 'Plan uw verbouwing slim met deze praktische tips van onze experts.',
      content: 'Een verbouwing is een grote stap. Met deze 5 tips zorgt u ervoor dat uw verbouwing soepel verloopt:\n\n1. **Maak een duidelijk plan**: Bepaal vooraf wat u wilt bereiken en stel een realistisch budget op.\n\n2. **Kies de juiste aannemer**: Vraag meerdere offertes aan en controleer referenties.\n\n3. **Vraag de juiste vergunningen aan**: Informeer bij uw gemeente welke vergunningen nodig zijn.\n\n4. **Houd rekening met onverwachte kosten**: Reserveer 10-15% van uw budget voor onvoorziene zaken.\n\n5. **Communiceer duidelijk**: Blijf in contact met uw aannemer en bespreek eventuele wijzigingen tijdig.\n\nBij BuildCraft begeleiden wij u door het hele proces, van ontwerp tot oplevering.',
      category: 'Renovatie',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      published: 1
    },
    {
      title: 'Moderne architectuur in Nederland',
      slug: 'moderne-architectuur-nederland',
      excerpt: 'Een blik op de mooiste moderne bouwprojecten in ons land.',
      content: 'Nederland staat bekend om zijn innovatieve architectuur. Van iconische wolkenkrabbers tot duurzame woonwijken - Nederlandse architecten zetten wereldwijd de toon.\n\nIn dit artikel nemen wij u mee langs enkele inspirerende projecten die laten zien wat er mogelijk is met moderne bouwtechnieken en creatief ontwerp.\n\nBuildCraft is trots om bij te dragen aan deze ontwikkeling met onze eigen projecten. Wij combineren functionaliteit met esthetiek en creëren gebouwen die generaties meegaan.',
      category: 'Architectuur',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800',
      published: 1
    },
    {
      title: 'Nieuwbouw vs. Renovatie: Wat past bij u?',
      slug: 'nieuwbouw-vs-renovatie',
      excerpt: 'Twijfelt u tussen nieuwbouw en renovatie? Wij helpen u bij de keuze.',
      content: 'De keuze tussen nieuwbouw en renovatie hangt af van verschillende factoren. In dit artikel bespreken wij de voor- en nadelen van beide opties.\n\n**Nieuwbouw voordelen:**\n- Volledig naar eigen wens inrichten\n- Moderne technieken en materialen\n- Energiezuinig\n- Weinig onderhoud eerste jaren\n\n**Renovatie voordelen:**\n- Vaak goedkoper dan nieuwbouw\n- Behoud van authentieke elementen\n- Sneller bewoonbaar\n- Minder milieubelasting\n\nBij BuildCraft adviseren wij u graag over de beste optie voor uw situatie.',
      category: 'Nieuwbouw',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      published: 1
    },
    {
      title: 'Energiezuinig bouwen: Investering voor de toekomst',
      slug: 'energiezuinig-bouwen',
      excerpt: 'Waarom energiezuinig bouwen loont en hoe u dit aanpakt.',
      content: 'Energiezuinig bouwen is goed voor het milieu én voor uw portemonnee. In dit artikel leggen wij uit hoe u uw woning energiezuinig maakt.\n\nVan isolatie tot zonnepanelen, van HR++ glas tot vloerverwarming - er zijn tal van mogelijkheden om uw energieverbruik te verlagen.\n\nBuildCraft heeft uitgebreide ervaring met energiezuinig bouwen en helpt u graag om uw woning toekomstbestendig te maken.',
      category: 'Duurzaamheid',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800',
      published: 1
    },
    {
      title: 'Bouwtrends 2024: Wat komt eraan?',
      slug: 'bouwtrends-2024',
      excerpt: 'De belangrijkste bouwtrends voor het komende jaar op een rij.',
      content: 'Welke trends gaan wij zien in 2024? Wij hebben de belangrijkste ontwikkelingen voor u op een rij gezet.\n\n1. **Circulair bouwen**: Hergebruik van materialen wordt steeds belangrijker.\n\n2. **Smart homes**: Domotica wordt standaard in nieuwbouw.\n\n3. **Biofiele architectuur**: Meer groen in en om gebouwen.\n\n4. **Modulair bouwen**: Sneller en efficiënter bouwen met prefab elementen.\n\n5. **Energieneutraal**: Gebouwen die zelf energie opwekken.\n\nBuildCraft loopt voorop in deze trends en integreert ze in onze projecten.',
      category: 'Advies',
      authorId: 1,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      published: 1
    }
  ];

  for (const post of blogPostsData) {
    await db.insert(blogPosts).values(post);
  }
  console.log(`✅ Seeded ${blogPostsData.length} blog posts`);

  // Seed Testimonials
  console.log('⭐ Seeding testimonials...');
  const testimonialsData = [
    {
      name: 'Jan de Vries',
      position: 'Eigenaar',
      company: 'De Vries Vastgoed',
      content: 'BuildCraft heeft ons kantoorpand perfect gerenoveerd. De kwaliteit van het werk en de communicatie waren uitstekend. Een aanrader!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      order: 1
    },
    {
      name: 'Maria Jansen',
      position: 'Particulier',
      company: null,
      content: 'Onze droomhuis is werkelijkheid geworden dankzij BuildCraft. Ze dachten mee, werkten netjes en hielden zich aan de planning.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      order: 2
    },
    {
      name: 'Peter Bakker',
      position: 'Directeur',
      company: 'Bakker & Zonen',
      content: 'Voor onze bedrijfshal hebben we BuildCraft ingeschakeld. Professioneel, betrouwbaar en een mooi eindresultaat!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      order: 3
    },
    {
      name: 'Sophie van Dam',
      position: 'Architect',
      company: 'Van Dam Architecten',
      content: 'Als architect werk ik graag samen met BuildCraft. Ze begrijpen mijn ontwerpen en voeren ze perfect uit.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      order: 4
    }
  ];

  for (const testimonial of testimonialsData) {
    await db.insert(testimonials).values(testimonial);
  }
  console.log(`✅ Seeded ${testimonialsData.length} testimonials`);

  // Seed Team Members
  console.log('👥 Seeding team members...');
  const teamData = [
    {
      name: 'Pieter van der Berg',
      position: 'Directeur / Oprichter',
      bio: 'Pieter heeft meer dan 25 jaar ervaring in de bouw. Hij richtte BuildCraft op met de missie om hoogwaardige bouwprojecten te realiseren.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      email: 'pieter@buildcraft.nl',
      phone: '+31 6 1234 5678',
      order: 1
    },
    {
      name: 'Lisa Vermeulen',
      position: 'Projectmanager',
      bio: 'Lisa zorgt ervoor dat alle projecten soepel verlopen. Met haar oog voor detail en organisatietalent is elk project in goede handen.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      email: 'lisa@buildcraft.nl',
      phone: '+31 6 2345 6789',
      order: 2
    },
    {
      name: 'Tom de Jong',
      position: 'Hoofduitvoerder',
      bio: 'Tom heeft ruime ervaring in de uitvoering van bouwprojecten. Hij coördineert de werkzaamheden op de bouwplaats.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      email: 'tom@buildcraft.nl',
      phone: '+31 6 3456 7890',
      order: 3
    },
    {
      name: 'Emma Visser',
      position: 'Architect',
      bio: 'Emma ontwerpt innovatieve en duurzame gebouwen. Haar creatieve oplossingen maken elk project uniek.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      email: 'emma@buildcraft.nl',
      phone: '+31 6 4567 8901',
      order: 4
    }
  ];

  for (const member of teamData) {
    await db.insert(teamMembers).values(member);
  }
  console.log(`✅ Seeded ${teamData.length} team members`);

  // Seed Sample Messages
  console.log('💬 Seeding sample messages...');
  const messagesData = [
    {
      name: 'Klaas Mulder',
      email: 'klaas@example.com',
      phone: '+31 6 9876 5432',
      message: 'Ik ben geïnteresseerd in een offerte voor de verbouwing van mijn woning. Kunnen jullie contact met mij opnemen?',
      isRead: 0
    },
    {
      name: 'Anna de Wit',
      email: 'anna@example.com',
      phone: '+31 6 8765 4321',
      message: 'Graag meer informatie over jullie duurzame bouwmethoden voor een nieuwbouwproject.',
      isRead: 0
    }
  ];

  for (const message of messagesData) {
    await db.insert(contactMessages).values(message);
  }
  console.log(`✅ Seeded ${messagesData.length} sample messages`);

  // Seed Site Settings
  console.log('⚙️  Seeding site settings...');
  const settingsData = [
    {
      key: 'site_title',
      value: 'BuildCraft - Professional Construction Services',
      type: 'text' as const
    },
    {
      key: 'contact_email',
      value: 'info@buildcraft.nl',
      type: 'text' as const
    },
    {
      key: 'contact_phone',
      value: '+31 20 123 4567',
      type: 'text' as const
    },
    {
      key: 'address',
      value: 'Bouwstraat 123, 1012 AB Amsterdam',
      type: 'text' as const
    }
  ];

  for (const setting of settingsData) {
    await db.insert(siteSettings).values(setting);
  }
  console.log(`✅ Seeded ${settingsData.length} site settings`);

  console.log('🎉 Database seeding completed!');
  await connection.end();
}

seed().catch(console.error);
