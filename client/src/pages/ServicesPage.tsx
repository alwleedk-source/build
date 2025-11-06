import { Link } from 'wouter';
import { ArrowLeft, Check, Building2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const servicesQuery = trpc.services.getAll.useQuery();

  if (servicesQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Diensten laden...</p>
      </div>
    );
  }

  const services = servicesQuery.data || [];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Back Button */}
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              Terug naar home
            </a>
          </Link>

          {/* Page Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Onze Diensten
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Alle diensten
            </h1>
            <p className="text-lg text-muted-foreground">
              BuildCraft biedt een compleet pakket aan bouwdiensten. Van nieuwbouw tot onderhoud, wij staan voor u klaar met vakmanschap en kwaliteit.
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-12">
            {services.map((service: any, index: number) => {
              const Icon = service.icon || Building2;
              return (
                <div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <a href={`/diensten/${service.slug}`} className={`group block ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="w-16 h-16 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.longDescription}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-3">
                      {(JSON.parse(service.features || '[]')).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 text-primary font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Lees meer
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </a>

                  {/* Image Placeholder */}
                  <div className={`group ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-[4/3] rounded-2xl bg-muted border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 relative">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          [
                            '1600585154340-be6161a56a0c',
                            '1581094794329-c8112a89af12',
                            '1589939705384-5185137a336d',
                            '1621905251189-08b45d6a269e',
                            '1486406146926-c627a92ad1ab',
                            '1565008576549-57569a49371d',
                          ][index]
                        }?w=800&h=600&fit=crop`}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-24 p-12 bg-card rounded-2xl border border-border text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interesse in onze diensten?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor meer informatie of een vrijblijvende offerte. Wij helpen u graag verder.
            </p>
            <Link href="/#contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all">
                Neem contact op
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
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
