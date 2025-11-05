import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ServiceForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/services/:id");
  const isEdit = params?.id && params.id !== "new";
  const serviceId = isEdit ? parseInt(params.id) : null;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    icon: "🏗️",
    features: "",
    showOnHomepage: false,
  });

  const serviceQuery = trpc.services.getById.useQuery(
    { id: serviceId! },
    { enabled: !!serviceId }
  );

  const createMutation = trpc.services.create.useMutation({
    onSuccess: () => {
      toast.success("Dienst aangemaakt!");
      setLocation("/admin/services");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  const updateMutation = trpc.services.update.useMutation({
    onSuccess: () => {
      toast.success("Dienst bijgewerkt!");
      setLocation("/admin/services");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  useEffect(() => {
    if (serviceQuery.data) {
      setFormData({
        title: serviceQuery.data.title,
        slug: serviceQuery.data.slug,
        description: serviceQuery.data.description,
        longDescription: serviceQuery.data.longDescription || "",
        icon: serviceQuery.data.icon,
        features: serviceQuery.data.features || "",
        showOnHomepage: serviceQuery.data.showOnHomepage === 1,
      });
    }
  }, [serviceQuery.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      showOnHomepage: formData.showOnHomepage ? 1 : 0,
    };

    if (isEdit && serviceId) {
      updateMutation.mutate({ id: serviceId, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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
            onClick={() => setLocation("/admin/services")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Dienst Bewerken" : "Nieuwe Dienst"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEdit ? "Wijzig de dienstgegevens" : "Voeg een nieuwe dienst toe"}
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
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: generateSlug(title),
                  });
                }}
                placeholder="Bijv. Nieuwbouw"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="nieuwbouw"
                required
              />
              <p className="text-sm text-muted-foreground">
                URL: /diensten/{formData.slug}
              </p>
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji) *</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="🏗️"
                maxLength={2}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Korte Beschrijving *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Korte beschrijving voor de homepage..."
                rows={3}
                required
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <Label htmlFor="longDescription">Lange Beschrijving</Label>
              <Textarea
                id="longDescription"
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData({ ...formData, longDescription: e.target.value })
                }
                placeholder="Uitgebreide beschrijving voor de detailpagina..."
                rows={6}
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features (JSON format)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder='["Feature 1", "Feature 2", "Feature 3"]'
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Voer een JSON array in met features
              </p>
            </div>

            {/* Show on Homepage */}
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
                Toon op homepage (max 4 diensten)
              </Label>
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
                onClick={() => setLocation("/admin/services")}
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
