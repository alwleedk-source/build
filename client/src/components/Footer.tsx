import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <ScrollReveal delay={0}>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">BuildCraft</h3>
            <p className="text-muted-foreground mb-6">
              Uw betrouwbare partner voor alle bouw- en onderhoudswerkzaamheden in Nederland.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Snelle Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Home
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Diensten
                </a>
              </li>
              <li>
                <a href="#projecten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Projecten
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Contact
                </a>
              </li>
            </ul>
          </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.2}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Diensten</h4>
            <ul className="space-y-3">
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Nieuwbouw
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Renovatie
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Afwerking
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  → Onderhoud
                </a>
              </li>
            </ul>
          </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.3}>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+31612345678" className="text-muted-foreground hover:text-primary transition-colors">
                  +31 6 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@buildcraft.nl" className="text-muted-foreground hover:text-primary transition-colors">
                  info@buildcraft.nl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Bouwstraat 123<br />
                  1234 AB Amsterdam
                </span>
              </li>
            </ul>
          </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal delay={0.4}>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} BuildCraft. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Beleid
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Algemene Voorwaarden
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Beleid
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
