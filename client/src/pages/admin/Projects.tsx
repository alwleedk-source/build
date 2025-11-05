import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Projects() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const projectsQuery = trpc.projects.getAll.useQuery();
  const deleteMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      toast.success("Project verwijderd!");
      projectsQuery.refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Fout bij verwijderen: " + error.message);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projecten</h1>
            <p className="text-muted-foreground mt-1">
              Beheer al uw bouwprojecten
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin/projects/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuw Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {projectsQuery.data?.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold text-foreground">
              {projectsQuery.data?.filter((p) => p.featured === 1).length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Op Homepage</p>
            <p className="text-2xl font-bold text-foreground">
              {projectsQuery.data?.filter((p) => p.showOnHomepage === 1).length || 0}
            </p>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">
                    Project
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Categorie
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-right p-4 font-semibold text-foreground">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectsQuery.isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Laden...
                    </td>
                  </tr>
                ) : projectsQuery.data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Geen projecten gevonden
                    </td>
                  </tr>
                ) : (
                  projectsQuery.data?.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {project.title}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {project.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {project.featured === 1 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                          {project.showOnHomepage === 1 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                              <Eye className="w-3 h-3" />
                              Homepage
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/projects/${project.id}`)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(project.id)}
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tip */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Voor geavanceerde database operaties, gebruik de Database UI in het Management Panel.
          </p>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Dit project wordt permanent verwijderd. Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
