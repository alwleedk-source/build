import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Image as ImageIcon } from "lucide-react";

export default function MediaAdmin() {
  const { data: media, isLoading } = trpc.media.getAll.useQuery();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Media</h1>
          <p className="text-muted-foreground">Mediabeheer - Binnenkort beschikbaar</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Mediabeheer wordt binnenkort toegevoegd
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Upload afbeeldingen via de Database UI in het Management Panel
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
