import Hero from '@/components/Hero';
import ServicesHome from '@/components/ServicesHome';
import ProjectsHome from '@/components/ProjectsHome';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import PartnersSection from '@/components/PartnersSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data';

export default function Home() {
  const baseUrl = 'https://build-production-09b2.up.railway.app';

  // Organization Schema
  const orgSchema = generateOrganizationSchema({
    name: 'BuildCraft',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'BuildCraft biedt professionele bouwdiensten in Nederland. Specialist in residentieel, commercieel en industrieel bouwen.',
    address: {
      streetAddress: '',
      addressLocality: 'Amsterdam',
      postalCode: '',
      addressCountry: 'NL',
    },
    contactPoint: {
      telephone: '+31 20 123 4567',
      email: 'info@buildcraft.nl',
      contactType: 'customer service',
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  });

  // Website Schema with Search
  const websiteSchema = generateWebsiteSchema(baseUrl, 'BuildCraft');

  return (
    <div className="min-h-screen">
      <SEO
        title="BuildCraft - Professional Construction Services"
        description="BuildCraft biedt professionele bouwdiensten in Nederland. Specialist in residentieel, commercieel en industrieel bouwen. Neem contact op voor uw bouwproject."
        keywords="bouwbedrijf, constructie, renovatie, aannemer, Nederland, bouw, BuildCraft, professionele bouwdiensten"
        url={baseUrl}
      />
      <StructuredData data={orgSchema} />
      <StructuredData data={websiteSchema} />
      <Hero />
      <ServicesHome />
      <ProjectsHome />
      <BlogSection />
      <Testimonials />
      <PartnersSection />
      <Contact />
      <Footer />
    </div>
  );
}
