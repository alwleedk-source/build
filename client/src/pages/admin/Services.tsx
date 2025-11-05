import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
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

export default function Services() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const servicesQuery = trpc.services.getAll.useQuery();
  const deleteMutation = trpc.services.delete.useMutation({
    onSuccess: () => {
      toast.success("Dienst verwijderd!");
      servicesQuery.refetch();
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
            <h1 className="text-3xl font-bold text-foreground">Diensten</h1>
            <p className="text-muted-foreground mt-1">
              Beheer al uw diensten
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin/services/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuwe Dienst
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal Diensten</p>
            <p className="text-2xl font-bold text-foreground">
              {servicesQuery.data?.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Op Homepage</p>
            <p className="text-2xl font-bold text-foreground">
              {servicesQuery.data?.filter((s) => s.showOnHomepage === 1).length || 0}
            </p>
          </Card>
        </div>

        {/* Services Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">
                    Dienst
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Slug
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
                {servicesQuery.isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Laden...
                    </td>
                  </tr>
                ) : servicesQuery.data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Geen diensten gevonden
                    </td>
                  </tr>
                ) : (
                  servicesQuery.data?.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                            {service.icon}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {service.title}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {service.slug}
                        </code>
                      </td>
                      <td className="p-4">
                        {service.showOnHomepage === 1 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                            <Eye className="w-3 h-3" />
                            Homepage
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/services/${service.id}`)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(service.id)}
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
            <strong>Tip:</strong> Maximaal 4 diensten kunnen worden weergegeven op de homepage.
          </p>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze dienst wordt permanent verwijderd. Deze actie kan niet ongedaan worden gemaakt.
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
