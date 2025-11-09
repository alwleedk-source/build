import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';
import { getLocalizedContent } from '@/lib/i18n-helpers';

export default function Hero() {
  const { i18n } = useTranslation();
  const heroQuery = trpc.heroSection.get.useQuery();
  const hero = heroQuery.data;

  // Default values if no hero settings
  const heroTitle = hero ? getLocalizedContent(hero, 'title', i18n.language) : 'Bouw uw dromen';
  const heroSubtitle = hero ? getLocalizedContent(hero, 'subtitle', i18n.language) : 'met BuildCraft';
  const heroDescription = hero ? getLocalizedContent(hero, 'description', i18n.language) : 'Professionele bouw- en onderhoudsdiensten voor uw gebouwen.';
  
  const primaryButtonText = hero ? getLocalizedContent(hero, 'primaryButtonText', i18n.language) : (i18n.language === 'en' ? 'Get In Touch' : 'Neem Contact Op');
  const primaryButtonLink = hero?.primaryButtonLink || '#contact';
  const secondaryButtonText = hero ? getLocalizedContent(hero, 'secondaryButtonText', i18n.language) : (i18n.language === 'en' ? 'Our Services' : 'Onze Diensten');
  const secondaryButtonLink = hero?.secondaryButtonLink || '#diensten';
  
  const showStats = hero?.showStats !== 0; // Show stats by default unless explicitly disabled
  const stat1Value = hero?.stat1Value?.toString() || '15+';
  const stat1Label = hero ? getLocalizedContent(hero, 'stat1Label', i18n.language) : 'Jaar ervaring';
  const stat2Value = hero?.stat2Value?.toString() || '500+';
  const stat2Label = hero ? getLocalizedContent(hero, 'stat2Label', i18n.language) : 'Projecten';
  const stat3Value = hero?.stat3Value?.toString() || '98%';
  const stat3Label = hero ? getLocalizedContent(hero, 'stat3Label', i18n.language) : 'Tevredenheid';
  const stat4Value = hero?.stat4Value?.toString() || '99%';
  const stat4Label = hero ? getLocalizedContent(hero, 'stat4Label', i18n.language) : 'Client Satisfaction';

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background -z-10" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                {i18n.language === 'en' ? 'New availability' : 'Nieuwe beschikbaarheid'}
              </span>
            </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                {heroTitle}
                {heroSubtitle && <span className="block text-primary">{heroSubtitle}</span>}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {heroDescription}
              </p>
            </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full group" asChild>
                <a href={primaryButtonLink}>
                  {primaryButtonText}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href={secondaryButtonLink}>
                  {secondaryButtonText}
                </a>
              </Button>
            </div>
            </ScrollReveal>

            {/* Stats */}
            {showStats && (
              <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat1Value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat1Label}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat2Value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat2Label}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat3Value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat3Label}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat4Value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat4Label}</div>
                </div>
              </div>
              </ScrollReveal>
            )}
          </div>

          {/* Illustration */}
          <ScrollReveal delay={0.4}>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              {/* Simple construction illustration */}
              <div className="relative w-full h-full flex items-end justify-center p-12">
                {/* House outline */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Base */}
                  <rect x="50" y="120" width="100" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  {/* Roof */}
                  <path d="M 40 120 L 100 80 L 160 120" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  {/* Door */}
                  <rect x="85" y="145" width="30" height="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
                  {/* Windows */}
                  <rect x="60" y="135" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
                  <rect x="125" y="135" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
                </svg>
                
                {/* Workers */}
                <div className="absolute bottom-8 left-1/4 flex items-end">
                  <div className="w-12 h-16 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/40" />
                    <div className="w-1 h-6 bg-primary/40" />
                    <div className="w-8 h-4 bg-primary/40 rounded-t" />
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-1/3 flex items-end">
                  <div className="w-12 h-16 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/60" />
                    <div className="w-1 h-6 bg-primary/60" />
                    <div className="w-8 h-4 bg-primary/60 rounded-t" />
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-1/4 flex items-end">
                  <div className="w-12 h-16 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/80" />
                    <div className="w-1 h-6 bg-primary/80" />
                    <div className="w-8 h-4 bg-primary/80 rounded-t" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
