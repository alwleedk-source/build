import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { trpc } from '@/lib/trpc';

export default function ServiceDetail() {
  const [, params] = useRoute("/diensten/:slug");
  const slug = params?.slug || '';
  
  const serviceQuery = trpc.services.getBySlug.useQuery({ slug });
  
  if (serviceQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Dienst laden...</p>
      </div>
    );
  }

  const service = serviceQuery.data;
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dienst niet gevonden</h1>
          <Button asChild>
            <Link href="/diensten">Terug naar diensten</Link>
          </Button>
        </div>
      </div>
    );
  }

  const features = typeof service.features === 'string' 
    ? JSON.parse(service.features) 
    : service.features || [];
  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Hammer;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Back Button */}
        <div className="container mb-8">
          <Button variant="ghost" asChild>
            <Link href="/diensten" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Terug naar alle diensten
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {service.title}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {service.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Over deze dienst
              </h2>
              <div className="text-muted-foreground space-y-4 whitespace-pre-line">
                {service.longDescription}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Wat wij bieden
              </h2>
              <ul className="space-y-3">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mt-16">
          <div className="max-w-4xl mx-auto p-12 bg-card rounded-2xl border border-border text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interesse in {service.title.toLowerCase()}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Neem contact met ons op voor een vrijblijvende offerte.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">
                Neem contact op
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
