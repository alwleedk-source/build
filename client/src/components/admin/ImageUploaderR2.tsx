import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  folder: 'projects' | 'services' | 'blog' | 'partners' | 'testimonials' | 'team' | 'general';
  label?: string;
  accept?: string;
}

export default function ImageUploaderR2({
  currentImage,
  onImageUploaded,
  folder,
  label = 'Afbeelding',
  accept = 'image/jpeg,image/png,image/webp,image/gif',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImage prop changes
  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Bestand is te groot. Maximale grootte is 5MB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to R2
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload-r2', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      
      // Return public URL to parent component
      onImageUploaded(data.url);
      toast.success('Afbeelding succesvol geüpload naar R2!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Fout bij uploaden: ' + (error.message || 'Onbekende fout'));
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="w-4 h-4 mr-2" />
              Verwijderen
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Vervangen
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Klik om een afbeelding te uploaden
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WebP of GIF (max 5MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploaden naar R2...</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload een afbeelding (max 5MB). Ondersteunde formaten: JPEG, PNG, WebP, GIF
      </p>
    </div>
  );
}
