import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useInView } from '@/hooks/useInView';
import { trpc } from '@/lib/trpc';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const { ref: leftRef, isInView: leftInView } = useInView({ threshold: 0.1 });
  const { ref: rightRef, isInView: rightInView } = useInView({ threshold: 0.1 });

  const createMessageMutation = trpc.messages.create.useMutation();

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
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div 
            ref={leftRef}
            className={`transition-all duration-1000 ${
              leftInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Neem Contact Op
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Laten we uw project bespreken
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Heeft u een bouwproject in gedachten? Neem contact met ons op voor een vrijblijvende offerte.
            </p>

            <div className="space-y-6">
              <div 
                className={`flex items-start gap-4 transition-all duration-700 ${
                  leftInView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Telefoon</p>
                  <a href="tel:+31612345678" className="text-muted-foreground hover:text-primary transition-colors">
                    +31 6 1234 5678
                  </a>
                </div>
              </div>

              <div 
                className={`flex items-start gap-4 transition-all duration-700 ${
                  leftInView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  <a href="mailto:info@buildcraft.nl" className="text-muted-foreground hover:text-primary transition-colors">
                    info@buildcraft.nl
                  </a>
                </div>
              </div>

              <div 
                className={`flex items-start gap-4 transition-all duration-700 ${
                  leftInView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Adres</p>
                  <p className="text-muted-foreground">
                    Bouwstraat 123<br />
                    1234 AB Amsterdam<br />
                    Nederland
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div 
            ref={rightRef}
            className={`transition-all duration-1000 ${
              rightInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card border border-border">
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Vertel ons over uw project..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full">
                Verstuur Bericht →
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
