import { Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';

export default function Testimonials() {
  const { data: testimonials = [] } = trpc.testimonials.getFeatured.useQuery();

  if (testimonials.length === 0) {
    return null;
  }

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
            <ScrollReveal key={testimonial.id} delay={index * 0.15}>
            <div
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {/* Rating with sequential stagger animation */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-primary text-primary animate-star-pop" 
                    style={{ 
                      animationDelay: `${(index * 0.15) + (i * 0.1)}s`,
                      opacity: 0
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}
                    {testimonial.company && ` - ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes star-pop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-star-pop {
          animation: star-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
    </section>
  );
}
