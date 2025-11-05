import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Alle');

  const filteredProjects = activeCategory === 'Alle' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Back Button */}
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              Terug naar home
            </a>
          </Link>

          {/* Page Header */}
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Onze Projecten
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Alle realisaties
            </h1>
            <p className="text-lg text-muted-foreground">
              Ontdek ons volledige portfolio van bouwprojecten. Van residentiële villa's tot industriële faciliteiten.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card text-foreground border border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Count */}
          <p className="text-muted-foreground mb-8">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projecten'} gevonden
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  
                  {/* View Project Button - Shows on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Bekijk details
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-background/90 text-foreground text-sm font-medium rounded-full backdrop-blur-sm">
                        Uitgelicht
                      </span>
                    </div>
                  )}
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Geen projecten gevonden in deze categorie.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-24 p-12 bg-card rounded-2xl border border-border text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Heeft u een project in gedachten?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvende offerte en laten we samen uw droomproject realiseren.
            </p>
            <Link href="/#contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all">
                Neem contact op
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
      </main>

      <Footer />
    </div>
  );
}
