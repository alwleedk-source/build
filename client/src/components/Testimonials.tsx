import { Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const testimonials = [
  {
    name: 'Jan de Vries',
    role: 'Huiseigenaar',
    content: 'BuildCraft heeft ons huis prachtig gerenoveerd. Professioneel, op tijd en binnen budget. Zeer tevreden!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Sophie van Dam',
    role: 'Bedrijfseigenaar',
    content: 'Uitstekende service en vakmanschap. Ons kantoorpand is volledig getransformeerd. Aanrader!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=45',
  },
  {
    name: 'Mark Jansen',
    role: 'Projectontwikkelaar',
    content: 'Betrouwbare partner voor al onze bouwprojecten. Kwaliteit en communicatie zijn top!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=33',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Wat klanten zeggen
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tevreden klanten
          </h2>
          <p className="text-lg text-muted-foreground">
            Ontdek waarom onze klanten voor BuildCraft kiezen.
          </p>
        </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
            <div
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Rating with sparkle animation */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-primary text-primary animate-sparkle" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-sparkle:hover {
          animation: sparkle 0.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
