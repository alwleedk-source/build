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
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    {project.category}
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
