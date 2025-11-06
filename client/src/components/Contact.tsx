import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const createMessageMutation = trpc.contactMessages.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createMessageMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      
      toast.success('Bedankt voor uw bericht! We nemen spoedig contact met u op.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Er is een fout opgetreden. Probeer het later opnieuw.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Neem Contact Op
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Laten we uw project bespreken
          </h2>
          <p className="text-lg text-muted-foreground">
            Heeft u een bouwproject in gedachten? Neem contact met ons op voor een vrijblijvende offerte.
          </p>
        </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {/* Phone */}
            <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2 text-lg">Telefoon</p>
                <a href="tel:+31612345678" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                  +31 6 1234 5678
                </a>
                <p className="text-sm text-muted-foreground mt-1">Ma-Vr: 8:00 - 18:00</p>
              </div>
            </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={0.2}>
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2 text-lg">Email</p>
                <a href="mailto:info@buildcraft.nl" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                  info@buildcraft.nl
                </a>
                <p className="text-sm text-muted-foreground mt-1">Reactie binnen 24 uur</p>
              </div>
            </div>
            </ScrollReveal>

            {/* Address */}
            <ScrollReveal delay={0.3}>
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2 text-lg">Adres</p>
                <p className="text-muted-foreground text-lg">
                  Bouwstraat 123<br />
                  1234 AB Amsterdam<br />
                  Nederland
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Right: Contact Form */}
          <ScrollReveal delay={0.4}>
          <div className="bg-card p-8 rounded-2xl border border-border shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-foreground mb-6">Stuur ons een bericht</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Uw naam"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="uw@email.nl"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Telefoon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="+31 6 1234 5678"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Vertel ons over uw project..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              >
                Verstuur bericht
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M7.5 15L12.5 10L7.5 5" />
                </svg>
              </Button>
            </form>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
