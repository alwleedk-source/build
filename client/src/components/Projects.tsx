const projects = [
  {
    title: 'Moderne Villa Amsterdam',
    category: 'Nieuwbouw',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    description: 'Luxe villa met duurzame materialen en moderne architectuur.',
  },
  {
    title: 'Kantoorgebouw Rotterdam',
    category: 'Renovatie',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    description: 'Complete renovatie van historisch kantoorpand.',
  },
  {
    title: 'Appartementencomplex Utrecht',
    category: 'Nieuwbouw',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    description: 'Energieneutraal complex met 50 appartementen.',
  },
];

export default function Projects() {
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
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
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
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
        </div>
      </div>
    </section>
  );
}
