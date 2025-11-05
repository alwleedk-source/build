export type ProjectCategory = 'Alle' | 'Residentieel' | 'Commercieel' | 'Industrieel';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  featured: boolean; // للمشاريع المعروضة في الصفحة الرئيسية
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Moderne Villa Amsterdam',
    category: 'Residentieel',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    description: 'Luxe villa met duurzame materialen en moderne architectuur.',
    featured: true,
  },
  {
    id: 2,
    title: 'Kantoorgebouw Rotterdam',
    category: 'Commercieel',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    description: 'Complete renovatie van historisch kantoorpand.',
    featured: true,
  },
  {
    id: 3,
    title: 'Appartementencomplex Utrecht',
    category: 'Residentieel',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    description: 'Energieneutraal complex met 50 appartementen.',
    featured: true,
  },
  {
    id: 4,
    title: 'Fabriek Den Haag',
    category: 'Industrieel',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    description: 'Moderne productiefaciliteit met duurzame energie.',
    featured: true,
  },
  {
    id: 5,
    title: 'Winkelcentrum Eindhoven',
    category: 'Commercieel',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop',
    description: 'Renovatie en uitbreiding van winkelcentrum.',
    featured: true,
  },
  {
    id: 6,
    title: 'Luxe Penthouse Amsterdam',
    category: 'Residentieel',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    description: 'Exclusief penthouse met panoramisch uitzicht.',
    featured: true,
  },
  {
    id: 7,
    title: 'Magazijn Rotterdam',
    category: 'Industrieel',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    description: 'Logistiek centrum met moderne faciliteiten.',
    featured: false,
  },
  {
    id: 8,
    title: 'Restaurant Utrecht',
    category: 'Commercieel',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    description: 'Stijlvol restaurant met open keuken concept.',
    featured: false,
  },
  {
    id: 9,
    title: 'Productiehal Tilburg',
    category: 'Industrieel',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop',
    description: 'Hoogwaardige productiehal met geautomatiseerde systemen.',
    featured: false,
  },
  {
    id: 10,
    title: 'Wooncomplex Den Bosch',
    category: 'Residentieel',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    description: 'Modern wooncomplex met gemeenschappelijke voorzieningen.',
    featured: false,
  },
  {
    id: 11,
    title: 'Kantoorpark Arnhem',
    category: 'Commercieel',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    description: 'Duurzaam kantoorpark met groene omgeving.',
    featured: false,
  },
  {
    id: 12,
    title: 'Industrieterrein Breda',
    category: 'Industrieel',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
    description: 'Multifunctioneel industrieterrein met moderne infrastructuur.',
    featured: false,
  },
];

export const categories: ProjectCategory[] = ['Alle', 'Residentieel', 'Commercieel', 'Industrieel'];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: ProjectCategory) => 
  category === 'Alle' ? projects : projects.filter(p => p.category === category);
