import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Twitter, Youtube } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const { data: footerData } = trpc.footerSettings.get.useQuery();

  // Default values
  const companyName = footerData?.companyName || 'BuildCraft';
  const companyDescription = (currentLang === 'en' ? footerData?.companyDescriptionEn : footerData?.companyDescription) || 'Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden in Nederland.';
  const address = footerData?.address || 'Bouwstraat 123\n1234 AB Amsterdam';
  const phone = footerData?.phone || '+31 6 1234 5678';
  const email = footerData?.email || 'info@buildcraft.nl';
  const copyrightText = (currentLang === 'en' ? footerData?.copyrightTextEn : footerData?.copyrightText) || `© ${currentYear} BuildCraft. Alle rechten voorbehouden.`;

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <ScrollReveal delay={0}>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{companyName}</h3>
            <p className="text-muted-foreground mb-6">
              {companyDescription}
            </p>
            <div className="flex gap-3">
              {footerData?.facebookUrl && (
                <a
                  href={footerData.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {footerData?.instagramUrl && (
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {footerData?.linkedinUrl && (
                <a
                  href={footerData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {footerData?.twitterUrl && (
                <a
                  href={footerData.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {footerData?.youtubeUrl && (
                <a
                  href={footerData.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">
              {currentLang === 'en' ? 'Quick Links' : 'Snelle Links'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Home' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Services' : 'Diensten'}
                </a>
              </li>
              <li>
                <a href="#projecten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Projects' : 'Projecten'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Reviews' : 'Reviews'}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Contact' : 'Contact'}
                </a>
              </li>
            </ul>
          </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.2}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">
              {currentLang === 'en' ? 'Services' : 'Diensten'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'New Construction' : 'Nieuwbouw'}
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Renovation' : 'Renovatie'}
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Finishing' : 'Afwerking'}
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → {currentLang === 'en' ? 'Maintenance' : 'Onderhoud'}
                </a>
              </li>
            </ul>
          </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.3}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">
              {currentLang === 'en' ? 'Contact' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              {phone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground whitespace-pre-line">
                    {address}
                  </span>
                </li>
              )}
            </ul>
          </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal delay={0.4}>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {copyrightText}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {currentLang === 'en' ? 'Privacy Policy' : 'Privacy Beleid'}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {currentLang === 'en' ? 'Terms & Conditions' : 'Algemene Voorwaarden'}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {currentLang === 'en' ? 'Cookie Policy' : 'Cookie Beleid'}
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
