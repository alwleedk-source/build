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
    titleEn: "",
    slug: "",
    description: "",
    descriptionEn: "",
    longDescription: "",
    longDescriptionEn: "",
    icon: "🏗️",
    features: "",
    featuresEn: "",
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
        titleEn: serviceQuery.data.titleEn || "",
        slug: serviceQuery.data.slug,
        description: serviceQuery.data.description,
        descriptionEn: serviceQuery.data.descriptionEn || "",
        longDescription: serviceQuery.data.longDescription || "",
        longDescriptionEn: serviceQuery.data.longDescriptionEn || "",
        icon: serviceQuery.data.icon,
        features: serviceQuery.data.features || "",
        featuresEn: serviceQuery.data.featuresEn || "",
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
      <div className="max-w-4xl space-y-6">
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
            {/* Title - Dutch & English */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titel (Nederlands) *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="titleEn">Title (English) *</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="E.g. New Construction"
                  required
                />
              </div>
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

            {/* Short Description - Dutch & English */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Korte Beschrijving (Nederlands) *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Short Description (English) *</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  placeholder="Short description for homepage..."
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Long Description - Dutch & English */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="longDescription">Lange Beschrijving (Nederlands)</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, longDescription: e.target.value })
                  }
                  placeholder="Uitgebreide beschrijving voor de detailpagina..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescriptionEn">Long Description (English)</Label>
                <Textarea
                  id="longDescriptionEn"
                  value={formData.longDescriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, longDescriptionEn: e.target.value })
                  }
                  placeholder="Detailed description for detail page..."
                  rows={5}
                />
              </div>
            </div>

            {/* Features - Dutch & English */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="features">Features (Nederlands, JSON format)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder='["Feature 1", "Feature 2", "Feature 3"]'
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Voer een JSON array in met features
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuresEn">Features (English, JSON format)</Label>
                <Textarea
                  id="featuresEn"
                  value={formData.featuresEn}
                  onChange={(e) =>
                    setFormData({ ...formData, featuresEn: e.target.value })
                  }
                  placeholder='["Feature 1", "Feature 2", "Feature 3"]'
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Enter a JSON array with features
                </p>
              </div>
            </div>

            {/* Show on Homepage */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="showOnHomepage"
                checked={formData.showOnHomepage}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, showOnHomepage: !!checked })
                }
              />
              <Label htmlFor="showOnHomepage" className="cursor-pointer">
                Toon op homepage (max 4 diensten)
              </Label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Opslaan..." : isEdit ? "Bijwerken" : "Aanmaken"}
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
