import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
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

export default function BlogPosts() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const blogQuery = trpc.blog.getAll.useQuery();
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Blog post verwijderd!");
      blogQuery.refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Fout bij verwijderen: " + error.message);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground mt-1">
              Beheer al uw blog artikelen
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin/blog/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuw Artikel
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {blogQuery.data?.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Gepubliceerd</p>
            <p className="text-2xl font-bold text-foreground">
              {blogQuery.data?.filter((p) => p.published === 1).length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Concepten</p>
            <p className="text-2xl font-bold text-foreground">
              {blogQuery.data?.filter((p) => p.published === 0).length || 0}
            </p>
          </Card>
        </div>

        {/* Blog Posts Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">
                    Artikel
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Categorie
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Datum
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
                {blogQuery.isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Laden...
                    </td>
                  </tr>
                ) : blogQuery.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Geen blog posts gevonden
                    </td>
                  </tr>
                ) : (
                  blogQuery.data?.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {post.image && (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {post.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Author ID: {post.authorId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(post.createdAt.toString())}
                        </p>
                      </td>
                      <td className="p-4">
                        {post.published === 1 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                            <Eye className="w-3 h-3" />
                            Gepubliceerd
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-600">
                            <EyeOff className="w-3 h-3" />
                            Concept
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/blog/${post.id}`)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(post.id)}
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
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Dit artikel wordt permanent verwijderd. Deze actie kan niet ongedaan worden gemaakt.
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
