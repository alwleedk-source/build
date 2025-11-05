import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { LayoutDashboard, FolderKanban, Wrench, FileText, Users } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: user } = trpc.auth.me.useQuery();
  const { data: projects } = trpc.projects.getAll.useQuery();
  const { data: services } = trpc.services.getAll.useQuery();
  const { data: blogPosts } = trpc.blog.getAll.useQuery();

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setLocation("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [setLocation]);

  if (!isAuthenticated) {
    return null;
  }
  
  const adminUser = localStorage.getItem("adminUser") || "Admin";

  const stats = [
    {
      title: "Totaal Projecten",
      value: projects?.length || 0,
      icon: FolderKanban,
      color: "bg-blue-500",
    },
    {
      title: "Totaal Diensten",
      value: services?.length || 0,
      icon: Wrench,
      color: "bg-green-500",
    },
    {
      title: "Totaal Blog Posts",
      value: blogPosts?.length || 0,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Featured Projecten",
      value: projects?.filter(p => p.featured === 1).length || 0,
      icon: FolderKanban,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welkom terug, {adminUser}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Database Management Info */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Database Beheer
            </h2>
            <p className="text-muted-foreground mb-6">
              Gebruik de Database UI in het Management paneel om content te beheren:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Open Management UI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Klik op het icoon rechtsboven in de interface
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Selecteer Database
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Klik op "Database" in het zijmenu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Beheer Content
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Voeg toe, bewerk of verwijder projecten, diensten en blog posts
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> Gebruik de "featured" kolom (0 of 1) om projecten op de homepage te tonen. 
                Gebruik "showOnHomepage" (0 of 1) voor diensten.
              </p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recente Projecten
            </h2>
            <div className="space-y-4">
              {projects?.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  {project.featured === 1 && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Services */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Alle Diensten
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services?.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.slug}
                    </p>
                  </div>
                  {service.showOnHomepage === 1 && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-semibold rounded-full">
                      Homepage
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
