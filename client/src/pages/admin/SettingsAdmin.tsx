import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Settings as SettingsIcon } from "lucide-react";

export default function SettingsAdmin() {
  const { data: settings, isLoading, refetch } = trpc.settings.getAll.useQuery();
  const upsertMutation = trpc.settings.upsert.useMutation();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when settings load
  useState(() => {
    if (settings) {
      const data: Record<string, string> = {};
      settings.forEach((setting) => {
        data[setting.key] = setting.value;
      });
      setFormData(data);
    }
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    setIsSaving(true);
    try {
      await upsertMutation.mutateAsync({
        key,
        value: formData[key] || "",
        type: "text",
      });
      toast.success("Instelling opgeslagen!");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // Save all settings
      for (const key in formData) {
        await upsertMutation.mutateAsync({
          key,
          value: formData[key] || "",
          type: "text",
        });
      }
      toast.success("Alle instellingen opgeslagen!");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <SettingsIcon className="w-8 h-8" />
              Instellingen
            </h1>
            <p className="text-muted-foreground mt-1">
              Beheer de algemene instellingen van je website
            </p>
          </div>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Alles Opslaan
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Algemene Instellingen</CardTitle>
              <CardDescription>
                Basisinformatie over je website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site_title">Website Titel</Label>
                <div className="flex gap-2">
                  <Input
                    id="site_title"
                    value={formData.site_title || ""}
                    onChange={(e) => handleChange("site_title", e.target.value)}
                    placeholder="BuildCraft - Professional Construction Services"
                  />
                  <Button
                    onClick={() => handleSave("site_title")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="site_description">Website Beschrijving</Label>
                <div className="flex gap-2">
                  <Textarea
                    id="site_description"
                    value={formData.site_description || ""}
                    onChange={(e) => handleChange("site_description", e.target.value)}
                    placeholder="Professionele bouw- en onderhoudsdiensten voor uw dromen"
                    rows={3}
                  />
                  <Button
                    onClick={() => handleSave("site_description")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Contactgegevens</CardTitle>
              <CardDescription>
                Contactinformatie die op de website wordt weergegeven
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contact_email">E-mailadres</Label>
                <div className="flex gap-2">
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email || ""}
                    onChange={(e) => handleChange("contact_email", e.target.value)}
                    placeholder="info@buildcraft.nl"
                  />
                  <Button
                    onClick={() => handleSave("contact_email")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact_phone">Telefoonnummer</Label>
                <div className="flex gap-2">
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={formData.contact_phone || ""}
                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                    placeholder="+31 20 123 4567"
                  />
                  <Button
                    onClick={() => handleSave("contact_phone")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Adres</Label>
                <div className="flex gap-2">
                  <Textarea
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Damrak 1, 1012 LG Amsterdam"
                    rows={2}
                  />
                  <Button
                    onClick={() => handleSave("address")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Links naar je social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="facebook_url"
                    type="url"
                    value={formData.facebook_url || ""}
                    onChange={(e) => handleChange("facebook_url", e.target.value)}
                    placeholder="https://facebook.com/buildcraft"
                  />
                  <Button
                    onClick={() => handleSave("facebook_url")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url || ""}
                    onChange={(e) => handleChange("linkedin_url", e.target.value)}
                    placeholder="https://linkedin.com/company/buildcraft"
                  />
                  <Button
                    onClick={() => handleSave("linkedin_url")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="instagram_url"
                    type="url"
                    value={formData.instagram_url || ""}
                    onChange={(e) => handleChange("instagram_url", e.target.value)}
                    placeholder="https://instagram.com/buildcraft"
                  />
                  <Button
                    onClick={() => handleSave("instagram_url")}
                    disabled={isSaving}
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
