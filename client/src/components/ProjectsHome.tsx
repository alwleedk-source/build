import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useInView } from '@/hooks/useInView';

export default function ProjectsHome() {
  const projectsQuery = trpc.projects.getHomepage.useQuery();
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.05 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.05 });

  if (projectsQuery.isLoading) {
    return (
      <section id="projecten" className="py-24 bg-muted/30">
        <div className="container text-center">
          <p className="text-muted-foreground">Projecten laden...</p>
        </div>
      </section>
    );
  }

  const projects = projectsQuery.data || [];

  return (
    <section id="projecten" className="py-24 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-1000 ${
            headerInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-50 translate-y-5'
          }`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Onze Projecten
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Recente realisaties
          </h2>
          <p className="text-lg text-muted-foreground">
            Een selectie van onze meest recente en trotse projecten.
          </p>
        </div>

        {/* Projects Grid - Only Homepage Projects (6 projects) */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div
              key={project.id}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ${
                gridInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-50 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.featured === 1 && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Uitgelicht
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            gridInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-50 translate-y-5'
          }`}
        >
          <Link href="/projecten">
            <button className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
              Bekijk alle projecten
              <span className="text-xl">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
