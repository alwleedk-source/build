import { Hammer, Wrench, PaintBucket, Shield } from 'lucide-react';

const services = [
  {
    icon: Hammer,
    title: 'Nieuwbouw',
    description: 'Complete nieuwbouwprojecten van fundering tot afwerking. Wij realiseren uw droomhuis met aandacht voor detail en kwaliteit.',
  },
  {
    icon: Wrench,
    title: 'Renovatie',
    description: 'Verbouw en renovatie van bestaande gebouwen. Van kleine aanpassingen tot complete transformaties.',
  },
  {
    icon: PaintBucket,
    title: 'Afwerking',
    description: 'Professionele afwerking en finishing touches. Stucwerk, schilderwerk en decoratieve elementen.',
  },
  {
    icon: Shield,
    title: 'Onderhoud',
    description: 'Regelmatig onderhoud en reparaties. Wij zorgen ervoor dat uw gebouw in topconditie blijft.',
  },
];

export default function Services() {
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
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
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
            >
              <path d="M7.5 15L12.5 10L7.5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
