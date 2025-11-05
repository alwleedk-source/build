import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

export default function OverOns() {
  const stats = [
    { label: "Jaar ervaring", value: "15+" },
    { label: "Projecten voltooid", value: "500+" },
    { label: "Tevreden klanten", value: "98%" },
    { label: "Medewerkers", value: "45+" },
  ];

  const values = [
    {
      icon: Target,
      title: "Onze Missie",
      description: "Het realiseren van hoogwaardige bouwprojecten die de verwachtingen van onze klanten overtreffen, met aandacht voor duurzaamheid en innovatie."
    },
    {
      icon: Heart,
      title: "Onze Visie",
      description: "Toonaangevend zijn in de bouwsector door continue vernieuwing, vakmanschap en een persoonlijke benadering van elk project."
    },
    {
      icon: Award,
      title: "Onze Waarden",
      description: "Kwaliteit, betrouwbaarheid, transparantie en duurzaamheid vormen de basis van alles wat wij doen."
    },
  ];

  const team = [
    {
      name: "Jan de Vries",
      role: "Directeur & Oprichter",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      description: "Met 20 jaar ervaring in de bouwsector leidt Jan het team met visie en passie."
    },
    {
      name: "Sophie van Dam",
      role: "Projectmanager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      description: "Sophie zorgt ervoor dat elk project soepel verloopt en op tijd wordt opgeleverd."
    },
    {
      name: "Mark Jansen",
      role: "Hoofduitvoerder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      description: "Mark coördineert de uitvoering en waarborgt de kwaliteit op de bouwplaats."
    },
    {
      name: "Lisa Peters",
      role: "Architect",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      description: "Lisa ontwerpt functionele en esthetische oplossingen voor elk project."
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Over Ons
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Bouwen aan de toekomst
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sinds 2008 realiseren wij hoogwaardige bouwprojecten in heel Nederland. 
              Met een team van ervaren professionals en een passie voor vakmanschap 
              bouwen wij niet alleen gebouwen, maar ook langdurige relaties met onze klanten.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-16 mb-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ons verhaal
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BuildCraft werd opgericht in 2008 door Jan de Vries, een ervaren bouwprofessional 
                  met een droom: hoogwaardige bouwprojecten realiseren met aandacht voor detail, 
                  duurzaamheid en klanttevredenheid.
                </p>
                <p>
                  Wat begon als een klein team van 5 mensen is uitgegroeid tot een gerenommeerd 
                  bouwbedrijf met meer dan 45 medewerkers. We hebben honderden projecten succesvol 
                  afgerond, van luxe villa's tot grote commerciële complexen.
                </p>
                <p>
                  Onze kracht ligt in de combinatie van traditioneel vakmanschap en moderne 
                  bouwtechnieken. We blijven investeren in innovatie en duurzaamheid, omdat wij 
                  geloven dat dit de toekomst van bouwen is.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=1000&fit=crop"
                alt="BuildCraft team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mb-24">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Onze kernwaarden
            </h2>
            <p className="text-lg text-muted-foreground">
              Deze waarden vormen de basis van ons handelen en bepalen hoe wij 
              met onze klanten, partners en medewerkers omgaan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mb-24">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ons team
            </h2>
            <p className="text-lg text-muted-foreground">
              Maak kennis met de mensen achter BuildCraft. Een team van 
              gepassioneerde professionals die elke dag het beste van zichzelf geven.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container">
          <div className="bg-primary/5 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Klaar om samen te bouwen?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Neem contact met ons op en ontdek hoe wij uw bouwproject tot een 
              succes kunnen maken.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Neem contact op
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
