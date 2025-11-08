import { trpc } from "@/lib/trpc";
import ScrollReveal from '@/components/ScrollReveal';

export default function PartnersSection() {
  const partnersQuery = trpc.partners.getFeatured.useQuery();

  if (!partnersQuery.data || partnersQuery.data.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <ScrollReveal>
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Onze Partners
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            Vertrouwd door toonaangevende bedrijven
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Wij zijn trots op onze samenwerkingen met deze gerenommeerde partners
          </p>
        </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partnersQuery.data.map((partner, index) => (
            <ScrollReveal key={partner.id} delay={index * 0.05}>
            <div
              className="flex items-center justify-center p-6 bg-white rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all group"
            >
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                    title={partner.name}
                  />
                </a>
              ) : (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                  title={partner.name}
                />
              )}
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
