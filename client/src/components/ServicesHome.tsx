import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Hammer, PaintBucket, Wrench, Building2 } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const iconMap: Record<string, any> = {
  Hammer,
  PaintBucket,
  Wrench,
  Building2,
};

export default function ServicesHome() {
  const servicesQuery = trpc.services.getHomepage.useQuery();
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.05 });

  if (servicesQuery.isLoading) {
    return (
      <section id="diensten" className="py-24">
        <div className="container text-center">
          <p className="text-muted-foreground">Diensten laden...</p>
        </div>
      </section>
    );
  }

  const services = servicesQuery.data || [];

  return (
    <section id="diensten" className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-1000 ${
            headerInView 
              ? 'translate-y-0' 
              : 'translate-y-10'
          }`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Onze Diensten
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Wat wij voor u kunnen doen
          </h2>
          <p className="text-lg text-muted-foreground">
            Van nieuwbouw tot onderhoud, wij bieden een compleet pakket aan bouwdiensten voor particulieren en bedrijven.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon] || Building2;
            return (
              <Link
                key={service.id}
                href={`/diensten/${service.slug}`}
                className={`group block transition-all duration-700 ${
                  gridInView
                    ? 'translate-y-0'
                    : 'translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Arrow indicator on hover */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="text-sm font-semibold">Meer info</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7.5 15L12.5 10L7.5 5" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            gridInView
              ? 'translate-y-0'
              : 'translate-y-10'
          }`}
        >
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold group transition-colors"
          >
            Bekijk alle diensten
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:translate-x-1 transition-transform"
            >
              <path d="M7.5 15L12.5 10L7.5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
