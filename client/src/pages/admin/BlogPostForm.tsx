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
import ImageUploaderLocal from "@/components/admin/ImageUploaderLocal";
import RichTextEditor from "@/components/admin/RichTextEditor";

const categories = [
  "Nieuwbouw",
  "Renovatie",
  "Duurzaamheid",
  "Architectuur",
  "Advies",
  "Technologie",
];

export default function BlogPostForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/blog/:id");
  const isEdit = params?.id && params.id !== "new";
  const postId = isEdit ? parseInt(params.id) : null;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Nieuwbouw",
    authorId: 1,
    published: false,
  });

  const postQuery = trpc.blog.getById.useQuery(
    { id: postId! },
    { enabled: !!postId }
  );

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Blog post aangemaakt!");
      setLocation("/admin/blog");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Blog post bijgewerkt!");
      setLocation("/admin/blog");
    },
    onError: (error) => {
      toast.error("Fout: " + error.message);
    },
  });

  useEffect(() => {
    if (postQuery.data) {
      setFormData({
        title: postQuery.data.title,
        slug: postQuery.data.slug,
        excerpt: postQuery.data.excerpt,
        content: postQuery.data.content,
        image: postQuery.data.image,
        category: postQuery.data.category,
        authorId: postQuery.data.authorId,
        published: postQuery.data.published,
      });
    }
  }, [postQuery.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      published: formData.published,
    };

    if (isEdit && postId) {
      updateMutation.mutate({ id: postId, ...data });
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
            onClick={() => setLocation("/admin/blog")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Artikel Bewerken" : "Nieuw Artikel"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEdit ? "Wijzig het artikel" : "Schrijf een nieuw blog artikel"}
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
                placeholder="Bijv. 5 Tips voor Duurzaam Bouwen"
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
                placeholder="5-tips-voor-duurzaam-bouwen"
                required
              />
              <p className="text-sm text-muted-foreground">
                URL: /blog/{formData.slug}
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Categorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Samenvatting *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Korte samenvatting van het artikel..."
                rows={3}
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                label="Inhoud *"
                placeholder="Volledige inhoud van het artikel..."
              />
              <p className="text-sm text-muted-foreground">
                Gebruik de editor toolbar voor rijke tekstopmaak
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <ImageUploaderLocal
                currentImage={formData.image}
                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                folder="blog"
                label="Blog Afbeelding *"
              />
              <p className="text-sm text-muted-foreground">
                Upload een afbeelding (max 5MB). Ondersteunde formaten: JPEG, PNG, WebP, GIF
              </p>
            </div>

            {/* Published */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked as boolean })
                }
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publiceren (zichtbaar voor bezoekers)
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
                onClick={() => setLocation("/admin/blog")}
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
