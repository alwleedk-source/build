import { Hammer, Wrench, PaintBucket, Shield, Building2, Drill } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    icon: Hammer,
    title: 'Nieuwbouw',
    slug: 'nieuwbouw',
    description: 'Complete nieuwbouwprojecten van fundering tot afwerking. Wij realiseren uw droomhuis met aandacht voor detail en kwaliteit.',
    longDescription: 'Onze nieuwbouwdiensten omvatten het volledige proces van ontwerp tot oplevering. Met jarenlange ervaring in de bouw van woningen, appartementen en commerciële gebouwen, zorgen wij voor een hoogwaardige realisatie die voldoet aan alle moderne normen en wensen.',
    features: [
      'Architectonisch ontwerp en planning',
      'Fundering en ruwbouw',
      'Duurzame bouwmaterialen',
      'Energiezuinige oplossingen',
      'Slimme woningtechnologie',
      'Volledige projectcoördinatie',
    ],
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Renovatie',
    slug: 'renovatie',
    description: 'Verbouw en renovatie van bestaande gebouwen. Van kleine aanpassingen tot complete transformaties.',
    longDescription: 'Of het nu gaat om een kleinschalige verbouwing of een complete renovatie, wij hebben de expertise om uw bestaande ruimte te transformeren. We respecteren het karakter van historische gebouwen terwijl we moderne comfort en functionaliteit toevoegen.',
    features: [
      'Volledige renovaties',
      'Badkamer en keuken verbouwingen',
      'Dakvernieuwing',
      'Isolatie en verduurzaming',
      'Monumentaal herstel',
      'Interieur aanpassingen',
    ],
  },
  {
    id: 3,
    icon: PaintBucket,
    title: 'Afwerking',
    slug: 'afwerking',
    description: 'Professionele afwerking en finishing touches. Stucwerk, schilderwerk en decoratieve elementen.',
    longDescription: 'De afwerking maakt het verschil tussen goed en perfect. Ons team van specialisten zorgt voor een vlekkeloze afwerking van uw project, van stucwerk tot schilderwerk en alle decoratieve details.',
    features: [
      'Stucwerk en pleisterwerk',
      'Binnen- en buitenschilderwerk',
      'Vloeren en tegelwerk',
      'Decoratieve afwerking',
      'Wandbekleding',
      'Detaillering en ornamenten',
    ],
  },
  {
    id: 4,
    icon: Shield,
    title: 'Onderhoud',
    slug: 'onderhoud',
    description: 'Regelmatig onderhoud en reparaties. Wij zorgen ervoor dat uw gebouw in topconditie blijft.',
    longDescription: 'Preventief onderhoud voorkomt kostbare reparaties en verlengt de levensduur van uw gebouw. Wij bieden onderhoudscontracten op maat voor particulieren en bedrijven.',
    features: [
      'Periodieke inspecties',
      'Preventief onderhoud',
      'Spoedrepar aties',
      'Onderhoudscontracten',
      'Dakonderhoud',
      'Gevelonderhoud',
    ],
  },
  {
    id: 5,
    icon: Building2,
    title: 'Commerciële Bouw',
    slug: 'commerciele-bouw',
    description: 'Bouw van kantoorgebouwen, winkels en bedrijfspanden. Functioneel en representatief.',
    longDescription: 'Voor commerciële projecten combineren wij functionaliteit met een professionele uitstraling. Van kantoorgebouwen tot winkelcentra, wij realiseren bedrijfspanden die perfect aansluiten bij uw bedrijfsvoering.',
    features: [
      'Kantoorgebouwen',
      'Winkelruimtes',
      'Bedrijfshallen',
      'Showrooms',
      'Horeca-inrichtingen',
      'Multifunctionele panden',
    ],
  },
  {
    id: 6,
    icon: Drill,
    title: 'Industriële Bouw',
    slug: 'industriele-bouw',
    description: 'Productie faciliteiten, magazijnen en industriële complexen. Robuust en efficiënt.',
    longDescription: 'Industriële bouwprojecten vereisen specifieke kennis en ervaring. Wij realiseren productiehallen, magazijnen en logistieke centra die voldoen aan alle technische en veiligheidseisen.',
    features: [
      'Productiehallen',
      'Magazijnen en distributiecentra',
      'Logistieke faciliteiten',
      'Technische installaties',
      'Veiligheidsvoorzieningen',
      'Energievoorziening',
    ],
  },
];

export const getFeaturedServices = () => services.slice(0, 4);
export const getAllServices = () => services;
