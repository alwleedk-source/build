import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string;
  showOnHomepage: number;
}

export default function ServiceDetail() {
  const [, params] = useRoute("/diensten/:slug");
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, use static data. Will be replaced with API call later
    const servicesData: Service[] = [
      {
        id: 1,
        title: "Nieuwbouw",
        slug: "nieuwbouw",
        description: "Complete nieuwbouwprojecten van fundering tot afwerking.",
        longDescription: "Bij BuildCraft realiseren wij complete nieuwbouwprojecten van A tot Z. Van de eerste schets tot de sleuteloverdracht begeleiden wij u in elk stadium van het bouwproces. Onze ervaren projectmanagers zorgen ervoor dat uw droomhuis precies wordt zoals u het voor ogen heeft.\n\nWij werken met de nieuwste bouwtechnieken en duurzame materialen om een energiezuinig en toekomstbestendig gebouw te realiseren. Of het nu gaat om een moderne villa, een appartementencomplex of een bedrijfspand, wij hebben de expertise om uw project tot een succes te maken.",
        icon: "Hammer",
        features: JSON.stringify([
          "Architectonisch ontwerp op maat",
          "Volledige projectbegeleiding",
          "Duurzame materialen en technieken",
          "Energiezuinige oplossingen",
          "Transparante communicatie",
          "Vaste opleverdatum"
        ]),
        showOnHomepage: 1,
      },
      {
        id: 2,
        title: "Renovatie",
        slug: "renovatie",
        description: "Verbouw en renovatie van bestaande gebouwen.",
        longDescription: "Geef uw bestaande woning of bedrijfspand een nieuwe uitstraling met onze renovatiediensten. Of het nu gaat om een badkamer, keuken of een complete verbouwing, wij zorgen voor een vakkundige uitvoering met minimale overlast.\n\nOnze specialisten hebben ruime ervaring met renovaties van monumentale panden tot moderne woningen. We respecteren de authentieke elementen en combineren deze met moderne technieken en materialen voor een optimaal resultaat.",
        icon: "Wrench",
        features: JSON.stringify([
          "Gratis adviesgesprek en offerte",
          "Minimale overlast tijdens werkzaamheden",
          "Behoud van authentieke elementen",
          "Moderne technieken en materialen",
          "Garantie op alle werkzaamheden",
          "Flexibele planning"
        ]),
        showOnHomepage: 1,
      },
      {
        id: 3,
        title: "Afwerking",
        slug: "afwerking",
        description: "Professionele afwerking en finishing touches.",
        longDescription: "De afwerking maakt het verschil tussen een goed en een perfect project. Onze specialisten zorgen voor een vlekkeloze afwerking van stucwerk, schilderwerk en alle decoratieve elementen.\n\nWe werken met hoogwaardige materialen en moderne technieken om een duurzaam en esthetisch resultaat te garanderen. Van gladstucwerk tot decoratieve afwerking, wij leveren vakwerk van de hoogste kwaliteit.",
        icon: "Paintbrush",
        features: JSON.stringify([
          "Hoogwaardig stucwerk",
          "Professioneel schilderwerk",
          "Decoratieve afwerking",
          "Kleuradvies op maat",
          "Snelle en nette uitvoering",
          "Garantie op materiaal en arbeid"
        ]),
        showOnHomepage: 1,
      },
      {
        id: 4,
        title: "Onderhoud",
        slug: "onderhoud",
        description: "Regelmatig onderhoud en reparaties.",
        longDescription: "Preventief onderhoud voorkomt grote problemen en hoge kosten. Met onze onderhoudscontracten zorgen wij dat uw pand altijd in optimale staat verkeert.\n\nOnze ervaren technici voeren regelmatige inspecties uit en signaleren tijdig eventuele gebreken. We bieden 24/7 storingsdienst voor acute problemen en zorgen voor snelle en professionele oplossingen.",
        icon: "Shield",
        features: JSON.stringify([
          "Preventief onderhoud",
          "Snelle reparatieservice",
          "24/7 storingsdienst",
          "Onderhoudscontracten op maat",
          "Ervaren vakspecialisten",
          "Vaste contactpersoon"
        ]),
        showOnHomepage: 1,
      },
      {
        id: 5,
        title: "Commerciële Bouw",
        slug: "commerciele-bouw",
        description: "Kantoorgebouwen, winkels en bedrijfspanden.",
        longDescription: "BuildCraft heeft ruime ervaring in commerciële bouwprojecten. Van kantoorgebouwen tot winkelcentra, wij realiseren functionele en representatieve bedrijfspanden die perfect aansluiten bij uw bedrijfsvoering.\n\nWe begrijpen dat tijd geld is in het bedrijfsleven. Daarom werken we efficiënt en planmatig om uw project binnen de afgesproken tijd en budget op te leveren, met minimale verstoring van uw bedrijfsactiviteiten.",
        icon: "Building2",
        features: JSON.stringify([
          "Functioneel ontwerp",
          "Snelle realisatie",
          "Minimale bedrijfsverstoring",
          "Duurzame oplossingen",
          "Flexibele indeling",
          "Toekomstbestendig"
        ]),
        showOnHomepage: 0,
      },
      {
        id: 6,
        title: "Industriële Bouw",
        slug: "industriele-bouw",
        description: "Fabrieken, magazijnen en productieruimtes.",
        longDescription: "Voor industriële bouwprojecten heeft u een partner nodig die begrijpt wat er komt kijken bij grootschalige, functionele bouw. BuildCraft heeft de expertise en middelen om uw industriële project succesvol te realiseren.\n\nWe realiseren fabrieken, magazijnen en productieruimtes met grote overspanningen, hoogwaardige vloeren en optimale logistieke routing. Veiligheid en functionaliteit staan altijd voorop.",
        icon: "Factory",
        features: JSON.stringify([
          "Grote overspanningen mogelijk",
          "Hoogwaardige vloeren",
          "Optimale logistieke routing",
          "Energiezuinige installaties",
          "Veiligheid voorop",
          "Snelle bouwmethoden"
        ]),
        showOnHomepage: 0,
      },
    ];

    const foundService = servicesData.find(s => s.slug === params?.slug);
    setService(foundService || null);
    setLoading(false);
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dienst niet gevonden</h1>
          <Button asChild>
            <a href="/diensten">Terug naar diensten</a>
          </Button>
        </div>
      </div>
    );
  }

  const features = JSON.parse(service.features);
  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Hammer;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Back Button */}
        <div className="container mb-8">
          <Button variant="ghost" asChild>
            <a href="/diensten" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Terug naar alle diensten
            </a>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                  Onze Diensten
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="text-xl text-muted-foreground">
              {service.description}
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section className="container mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop`}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mb-16">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Over deze dienst
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {service.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-32">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Wat wij bieden
                </h3>
                <ul className="space-y-3">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button asChild className="w-full">
                    <a href="/#contact">
                      Vraag offerte aan
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container">
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interesse in {service.title.toLowerCase()}?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Neem contact met ons op voor een vrijblijvend adviesgesprek en offerte.
            </p>
            <Button asChild size="lg">
              <a href="/#contact">
                Neem contact op
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
