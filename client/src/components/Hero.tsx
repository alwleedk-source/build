import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background -z-10" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollReveal>
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Nieuwe beschikbaarheid</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                Bouw uw dromen
                <span className="block text-primary">met BuildCraft</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Professionele bouw- en onderhoudsdiensten voor uw gebouwen. Van nieuwbouw tot renovatie, wij maken het mogelijk.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full group" asChild>
                <a href="#contact">
                  Neem Contact Op
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="#diensten">Onze Diensten</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Jaar ervaring</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Projecten</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Tevredenheid</div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Illustration */}
          <ScrollReveal delay={0.2}>
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <svg
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Construction workers */}
              <g className="animate-float">
                {/* Worker 1 - with hammer */}
                <g transform="translate(100, 250)">
                  <circle cx="20" cy="0" r="15" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 15 L20 50" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 25 L5 40" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 25 L35 40 L45 30" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <path d="M20 50 L5 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 50 L35 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                </g>

                {/* Worker 2 - with blueprint */}
                <g transform="translate(250, 270)">
                  <circle cx="20" cy="0" r="15" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 15 L20 50" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 25 L0 35 L0 45 L20 35" stroke="currentColor" strokeWidth="2" className="text-primary" fill="oklch(0.75 0.15 85 / 0.2)" />
                  <path d="M20 50 L5 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 50 L35 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                </g>

                {/* Worker 3 - with toolbox */}
                <g transform="translate(400, 260)">
                  <circle cx="20" cy="0" r="15" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 15 L20 50" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 25 L35 40" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <rect x="30" y="35" width="20" height="15" stroke="currentColor" strokeWidth="2" className="text-primary" fill="oklch(0.75 0.15 85 / 0.2)" />
                  <path d="M20 50 L5 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                  <path d="M20 50 L35 70" stroke="currentColor" strokeWidth="2" className="text-foreground" />
                </g>
              </g>

              {/* Building structure */}
              <g className="opacity-30">
                <rect x="80" y="350" width="440" height="4" fill="currentColor" className="text-primary" />
                <path d="M150 350 L150 200 L250 150 L350 200 L350 350" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" strokeDasharray="5,5" />
                <path d="M380 350 L380 220 L480 220 L480 350" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" strokeDasharray="5,5" />
              </g>

              {/* Decorative elements */}
              <circle cx="500" cy="100" r="40" fill="currentColor" className="text-primary opacity-10" />
              <circle cx="80" cy="150" r="30" fill="currentColor" className="text-primary opacity-10" />
              <circle cx="520" cy="300" r="25" fill="currentColor" className="text-primary opacity-10" />
            </svg>
          </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
