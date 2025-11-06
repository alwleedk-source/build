import { trpc } from "@/lib/trpc";
import Hero from "@/components/Hero";
import ServicesHome from '@/components/ServicesHome';
import ProjectsHome from '@/components/ProjectsHome';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: settings } = trpc.settings.getAll.useQuery();

  // Helper function to check if a section should be shown
  const shouldShowSection = (key: string): boolean => {
    const setting = settings?.find(s => s.key === key);
    return setting?.value === 'true';
  };

  return (
    <div className="min-h-screen">
      {shouldShowSection('show_hero_section') && <Hero />}
      {shouldShowSection('show_services_section') && <ServicesHome />}
      {shouldShowSection('show_projects_section') && <ProjectsHome />}
      {shouldShowSection('show_testimonials_section') && <Testimonials />}
      {shouldShowSection('show_contact_section') && <Contact />}
      <Footer />
    </div>
  );
}
