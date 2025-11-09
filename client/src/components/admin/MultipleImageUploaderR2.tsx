import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MultipleImageUploaderR2Props {
  currentImages: string[];
  onImagesChanged: (images: string[]) => void;
  folder: string;
  label?: string;
  maxImages?: number;
}

export default function MultipleImageUploaderR2({
  currentImages,
  onImagesChanged,
  folder,
  label = "Afbeeldingen",
  maxImages = 10,
}: MultipleImageUploaderR2Props) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed max
    if (currentImages.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} afbeeldingen toegestaan`);
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is te groot (max 5MB)`);
          continue;
        }

        // Validate file type
        if (!file.type.match(/^image\/(jpeg|jpg|png|webp|gif)$/)) {
          toast.error(`${file.name} is geen ondersteund bestandstype`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload-r2", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      if (uploadedUrls.length > 0) {
        onImagesChanged([...currentImages, ...uploadedUrls]);
        toast.success(`${uploadedUrls.length} afbeelding(en) geüpload!`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload mislukt. Probeer opnieuw.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onImagesChanged(newImages);
    toast.success("Afbeelding verwijderd");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-muted-foreground">
          {currentImages.length} / {maxImages}
        </span>
      </div>

      {/* Image Grid */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((url, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <img
                src={url}
                alt={`Afbeelding ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {currentImages.length < maxImages && (
        <Card className="border-2 border-dashed p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {currentImages.length === 0
                  ? "Upload projectfoto's"
                  : "Voeg meer foto's toe"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sleep bestanden hierheen of klik om te selecteren
              </p>
            </div>
            <label htmlFor="multiple-image-upload">
              <Button
                type="button"
                variant="outline"
                disabled={uploading}
                className="gap-2"
                onClick={() =>
                  document.getElementById("multiple-image-upload")?.click()
                }
              >
                <Upload className="h-4 w-4" />
                {uploading ? "Uploaden..." : "Selecteer Afbeeldingen"}
              </Button>
            </label>
            <input
              id="multiple-image-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Upload meerdere afbeeldingen (max 5MB per afbeelding). Ondersteunde
        formaten: JPEG, PNG, WebP, GIF
      </p>
    </div>
  );
}
