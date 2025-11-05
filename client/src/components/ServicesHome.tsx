import { getFeaturedServices } from '@/data/services';
import { Link } from 'wouter';

export default function ServicesHome() {
  const services = getFeaturedServices();

  return (
    <section id="diensten" className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
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
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/diensten">
            <span className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer">
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
              >
                <path d="M7.5 15L12.5 10L7.5 5" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
