import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Calendar, Tag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: project, isLoading } = trpc.projects.getBySlug.useQuery(
    params?.slug || "",
    { enabled: !!params?.slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project niet gevonden</h1>
        <Button onClick={() => setLocation("/projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar projecten
        </Button>
      </div>
    );
  }

  // Parse images array
  const additionalImages = project.images ? JSON.parse(project.images) : [];
  const allImages = [project.image, ...additionalImages];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <img
          src={selectedImage || project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-6xl">
            <Button
              variant="ghost"
              onClick={() => setLocation("/projects")}
              className="mb-4 text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar projecten
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.createdAt).toLocaleDateString('nl-NL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Description */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Over dit project</h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
            {project.content || project.description}
          </p>
        </Card>

        {/* Image Gallery */}
        {allImages.length > 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Projectfoto's</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                    selectedImage === img ? 'ring-4 ring-[var(--primary)]' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${project.title} - Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Project Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-[var(--text-secondary)]">Categorie</dt>
                <dd className="font-medium">{project.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--text-secondary)]">Status</dt>
                <dd className="font-medium">
                  {project.featured ? 'Uitgelicht' : 'Standaard'}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--text-secondary)]">Datum</dt>
                <dd className="font-medium">
                  {new Date(project.createdAt).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Geïnteresseerd?</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Neem contact met ons op voor meer informatie over dit project of om een vergelijkbaar project te bespreken.
            </p>
            <Button
              onClick={() => setLocation("/contact")}
              className="w-full"
            >
              Neem Contact Op
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
