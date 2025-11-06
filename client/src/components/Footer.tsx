import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <ScrollReveal>
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
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
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Snelle Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Diensten
                </a>
              </li>
              <li>
                <a href="#projecten" className="text-muted-foreground hover:text-primary transition-colors">
                  Projecten
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Diensten</h4>
            <ul className="space-y-3">
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Nieuwbouw
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Renovatie
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Afwerking
                </a>
              </li>
              <li>
                <a href="#diensten" className="text-muted-foreground hover:text-primary transition-colors">
                  Onderhoud
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+31612345678" className="hover:text-primary transition-colors">
                  +31 6 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@buildcraft.nl" className="hover:text-primary transition-colors">
                  info@buildcraft.nl
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Bouwstraat 123<br />
                  1234 AB Amsterdam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} BuildCraft. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacybeleid
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
      </div>
      </ScrollReveal>
    </footer>
  );
}
