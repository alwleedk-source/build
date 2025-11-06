import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { useEffect } from 'react';

export default function Hero() {
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.3 });
  
  const yearsCounter = useCountUp({ end: 15, duration: 2000, suffix: '+' });
  const projectsCounter = useCountUp({ end: 500, duration: 2500, suffix: '+' });
  const satisfactionCounter = useCountUp({ end: 98, duration: 2000, suffix: '%' });

  useEffect(() => {
    if (statsInView) {
      yearsCounter.startCounting();
      projectsCounter.startCounting();
      satisfactionCounter.startCounting();
    }
  }, [statsInView]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background -z-10" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge - fade in */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Nieuwe beschikbaarheid</span>
            </div>

            {/* Heading - fade in */}
            <div className="space-y-4">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Bouw uw dromen
                <span className="block text-primary">met BuildCraft</span>
              </h1>
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                Professionele bouw- en onderhoudsdiensten voor uw gebouwen. Van nieuwbouw tot renovatie, wij maken het mogelijk.
              </p>
            </div>

            {/* CTA Buttons - fade in */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
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

            {/* Stats with counter animation */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="transform transition-transform hover:scale-110 duration-300">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {yearsCounter.displayValue}
                </div>
                <div className="text-sm text-muted-foreground">Jaar ervaring</div>
              </div>
              <div className="transform transition-transform hover:scale-110 duration-300">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {projectsCounter.displayValue}
                </div>
                <div className="text-sm text-muted-foreground">Projecten</div>
              </div>
              <div className="transform transition-transform hover:scale-110 duration-300">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {satisfactionCounter.displayValue}
                </div>
                <div className="text-sm text-muted-foreground">Tevredenheid</div>
              </div>
            </div>
          </div>

          {/* Illustration - scale in */}
          <div 
            className="relative lg:h-[600px] flex items-center justify-center animate-scale-in"
            style={{ animationDelay: '0.6s' }}
          >
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          opacity: 0;
          animation: scaleIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
