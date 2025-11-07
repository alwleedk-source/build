import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ImageUploader from "@/components/admin/ImageUploader";

export default function ProjectForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/projects/:id");
  const isEdit = params?.id && params.id !== "new";
  const projectId = isEdit ? parseInt(params.id) : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Residentieel" as "Residentieel" | "Commercieel" | "Industrieel",
    image: "",
    featured: false,
    showOnHomepage: false,
  });

  const projectQuery = trpc.projects.getById.useQuery(
    { id: projectId! },
    { enabled: !!projectId }
  );

  const createMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      toast.success("Project aangemaakt!");
      setLocation("/admin/projects");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      toast.success("Project bijgewerkt!");
      setLocation("/admin/projects");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  useEffect(() => {
    if (projectQuery.data) {
      setFormData({
        title: projectQuery.data.title,
        description: projectQuery.data.description,
        category: projectQuery.data.category,
        image: projectQuery.data.image,
        featured: projectQuery.data.featured === 1,
        showOnHomepage: projectQuery.data.showOnHomepage === 1,
      });
    }
  }, [projectQuery.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      featured: formData.featured ? 1 : 0,
      showOnHomepage: formData.showOnHomepage ? 1 : 0,
    };

    if (isEdit && projectId) {
      updateMutation.mutate({ id: projectId, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/admin/projects")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Project Bewerken" : "Nieuw Project"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEdit ? "Wijzig de projectgegevens" : "Voeg een nieuw project toe"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Bijv. Moderne Villa Amsterdam"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Beschrijving *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Beschrijf het project..."
                rows={4}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Categorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residentieel">Residentieel</SelectItem>
                  <SelectItem value="Commercieel">Commercieel</SelectItem>
                  <SelectItem value="Industrieel">Industrieel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <ImageUploader
                currentImage={formData.image}
                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                folder="projects"
                label="Project Afbeelding *"
              />
              <p className="text-sm text-muted-foreground">
                Upload een afbeelding (max 5MB). Ondersteunde formaten: JPEG, PNG, WebP, GIF
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured (uitgelicht)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showOnHomepage"
                  checked={formData.showOnHomepage}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      showOnHomepage: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="showOnHomepage" className="cursor-pointer">
                  Toon op homepage (max 6 projecten)
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="gap-2">
                <Save className="w-4 h-4" />
                {isLoading ? "Bezig..." : isEdit ? "Bijwerken" : "Aanmaken"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/admin/projects")}
              >
                Annuleren
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
