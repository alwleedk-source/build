import { getFeaturedProjects } from '@/data/projects';
import { Link } from 'wouter';

export default function ProjectsHome() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section id="projecten" className="py-24 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
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

        {/* Projects Grid - Only Featured (6 projects) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
                
                {/* View Project Button - Shows on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Bekijk project
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/projecten">
            <a className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Bekijk alle projecten
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 15L12.5 10L7.5 5" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
