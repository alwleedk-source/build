import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Award, Heart, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function OverOns() {
  const { data: aboutData, isLoading } = trpc.aboutUs.get.useQuery();
  const { data: teamMembers, isLoading: teamLoading } = trpc.teamMembers.getAll.useQuery();
  const language = 'nl'; // Default to Dutch

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">About Us content not found</p>
      </div>
    );
  }

  const title = false ? aboutData.titleEn : aboutData.title;
  const subtitle = false ? aboutData.subtitleEn : aboutData.subtitle;
  const description = false ? aboutData.descriptionEn : aboutData.description;
  const mission = false ? aboutData.missionEn : aboutData.mission;
  const vision = false ? aboutData.visionEn : aboutData.vision;
  const values = false ? aboutData.valuesEn : aboutData.values;

  const stats = [
    { 
      label: false ? "Years Experience" : "Jaar ervaring", 
      value: `${aboutData.yearsExperience}+` 
    },
    { 
      label: false ? "Projects Completed" : "Projecten voltooid", 
      value: `${aboutData.projectsCompleted}+` 
    },
    { 
      label: false ? "Happy Clients" : "Tevreden klanten", 
      value: `${aboutData.happyClients}%` 
    },
    { 
      label: false ? "Team Members" : "Medewerkers", 
      value: `${aboutData.teamMembers}+` 
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: false ? "Our Mission" : "Onze Missie",
      description: mission || ""
    },
    {
      icon: Heart,
      title: false ? "Our Vision" : "Onze Visie",
      description: vision || ""
    },
    {
      icon: Award,
      title: false ? "Our Values" : "Onze Waarden",
      description: values || ""
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Hero Section - DYNAMIC */}
        <section className="container mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {false ? 'About Us' : 'Over Ons'}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Stats Section - DYNAMIC */}
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

        {/* Story Section - DYNAMIC */}
        <section className="container mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {false ? 'Our Story' : 'Ons verhaal'}
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {description}
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              {aboutData.image ? (
                <img
                  src={aboutData.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Values Section - DYNAMIC */}
        <section className="container mb-24">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {false ? 'Our Core Values' : 'Onze kernwaarden'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {false 
                ? 'These values form the foundation of our actions and determine how we interact with our clients, partners and employees.'
                : 'Deze waarden vormen de basis van ons handelen en bepalen hoe wij met onze klanten, partners en medewerkers omgaan.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
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

        {/* Team Section - DYNAMIC */}
        {teamMembers && teamMembers.length > 0 && (
          <section className="container mb-24">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {false ? 'Our Team' : 'Ons team'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {false
                  ? 'Meet the people behind BuildCraft. A team of passionate professionals who give their best every day.'
                  : 'Maak kennis met de mensen achter BuildCraft. Een team van gepassioneerde professionals die elke dag het beste van zichzelf geven.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => {
                const position = false ? member.positionEn : member.position;
                const bio = false ? member.bioEn : member.bio;
                
                return (
                  <div
                    key={member.id}
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
                      {position}
                    </p>
                    {bio && (
                      <p className="text-sm text-muted-foreground">
                        {bio}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="container">
          <div className="bg-primary/5 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {false ? 'Ready to build together?' : 'Klaar om samen te bouwen?'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {false
                ? 'Contact us and discover how we can make your construction project a success.'
                : 'Neem contact met ons op en ontdek hoe wij uw bouwproject tot een succes kunnen maken.'}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              {false ? 'Get In Touch' : 'Neem contact op'}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
