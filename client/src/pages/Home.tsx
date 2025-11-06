import Hero from '@/components/Hero';
import ServicesHome from '@/components/ServicesHome';
import ProjectsHome from '@/components/ProjectsHome';
import Testimonials from '@/components/Testimonials';
import PartnersSection from '@/components/PartnersSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesHome />
      <ProjectsHome />
      <Testimonials />
      <PartnersSection />
      <Contact />
      <Footer />
    </div>
  );
}
