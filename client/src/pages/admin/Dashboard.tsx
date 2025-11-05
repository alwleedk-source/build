import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { FolderKanban, Wrench, FileText, MessageSquare, TrendingUp, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    blogPosts: 0,
    messages: 0,
  });

  const projectsQuery = trpc.projects.getAll.useQuery();
  const servicesQuery = trpc.services.getAll.useQuery();
  const blogQuery = trpc.blog.getPublished.useQuery();

  useEffect(() => {
    if (projectsQuery.data) {
      setStats((prev) => ({ ...prev, projects: projectsQuery.data.length }));
    }
    if (servicesQuery.data) {
      setStats((prev) => ({ ...prev, services: servicesQuery.data.length }));
    }
    if (blogQuery.data) {
      setStats((prev) => ({ ...prev, blogPosts: blogQuery.data.length }));
    }
  }, [projectsQuery.data, servicesQuery.data, blogQuery.data]);

  const statCards = [
    {
      title: "Totaal Projecten",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Diensten",
      value: stats.services,
      icon: Wrench,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Berichten",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welkom terug! Hier is een overzicht van uw website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Snelle Acties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Nieuw Project</h3>
                  <p className="text-sm text-muted-foreground">Voeg een project toe</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Nieuw Blog Post</h3>
                  <p className="text-sm text-muted-foreground">Schrijf een artikel</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Bekijk Berichten</h3>
                  <p className="text-sm text-muted-foreground">Lees nieuwe berichten</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recente Activiteit</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Website actief</p>
                  <p className="text-sm text-muted-foreground">
                    Alle systemen werken normaal
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Nu</span>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{stats.projects} projecten</p>
                  <p className="text-sm text-muted-foreground">
                    Totaal aantal projecten in database
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">CMS Actief</p>
                  <p className="text-sm text-muted-foreground">
                    Content management systeem is operationeel
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Database UI Info */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Database UI</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Voor geavanceerde database operaties, gebruik de Database UI in het Management Panel.
                Klik op het icoon rechtsboven → Database.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Directe toegang tot alle tabellen</li>
                <li>• Bulk operaties</li>
                <li>• SQL queries uitvoeren</li>
                <li>• Data export/import</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
