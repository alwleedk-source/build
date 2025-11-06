import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Palette, Home, Phone, Share2, Search, FileText } from "lucide-react";

export default function SettingsAdmin() {
  const { data: settings, isLoading, refetch } = trpc.settings.getAll.useQuery();
  const upsertSetting = trpc.settings.upsert.useMutation({
    onSuccess: () => {
      toast.success("Instelling opgeslagen!");
      refetch();
    },
    onError: () => {
      toast.error("Fout bij opslaan");
    }
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const data: Record<string, string> = {};
      settings.forEach(setting => {
        data[setting.key] = setting.value;
      });
      setFormData(data);
    }
  }, [settings]);

  const handleSave = async (key: string, type: 'text' | 'number' | 'boolean' | 'json' | 'image' = 'text') => {
    await upsertSetting.mutateAsync({
      key,
      value: formData[key] || '',
      type
    });
  };

  const handleSaveAll = async () => {
    for (const key in formData) {
      const setting = settings?.find(s => s.key === key);
      await upsertSetting.mutateAsync({
        key,
        value: formData[key],
        type: setting?.type || 'text'
      });
    }
    toast.success("Alle instellingen opgeslagen!");
  };

  const handleToggle = async (key: string, checked: boolean) => {
    const value = checked ? 'true' : 'false';
    setFormData(prev => ({ ...prev, [key]: value }));
    await upsertSetting.mutateAsync({
      key,
      value,
      type: 'boolean'
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Laden...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Instellingen</h1>
            <p className="text-muted-foreground mt-1">
              Beheer alle website-instellingen
            </p>
          </div>
          <Button onClick={handleSaveAll} size="lg">
            <Save className="mr-2 h-4 w-4" />
            Alles Opslaan
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Algemeen
            </TabsTrigger>
            <TabsTrigger value="homepage" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Homepage
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Footer
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Algemene Instellingen</CardTitle>
                <CardDescription>
                  Website naam, logo en kleuren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="site_title">Website Titel</Label>
                  <div className="flex gap-2">
                    <Input
                      id="site_title"
                      value={formData.site_title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, site_title: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('site_title')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="site_description">Website Beschrijving</Label>
                  <div className="flex gap-2">
                    <Input
                      id="site_description"
                      value={formData.site_description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('site_description')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="site_logo">Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="site_logo"
                      value={formData.site_logo || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, site_logo: e.target.value }))}
                      placeholder="/logo.png"
                    />
                    <Button onClick={() => handleSave('site_logo')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.site_logo && (
                    <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img 
                        src={formData.site_logo} 
                        alt="Logo preview" 
                        className="h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150x50?text=Logo';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="primary_color">Primaire Kleur</Label>
                  <div className="flex gap-2">
                    <div className="flex gap-2 flex-1">
                      <Input
                        id="primary_color"
                        type="color"
                        value={formData.primary_color || '#D4AF37'}
                        onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                        className="w-20 h-10"
                      />
                      <Input
                        value={formData.primary_color || '#D4AF37'}
                        onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                        placeholder="#D4AF37"
                      />
                    </div>
                    <Button onClick={() => handleSave('primary_color')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="secondary_color">Secondaire Kleur</Label>
                  <div className="flex gap-2">
                    <div className="flex gap-2 flex-1">
                      <Input
                        id="secondary_color"
                        type="color"
                        value={formData.secondary_color || '#1a1a1a'}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                        className="w-20 h-10"
                      />
                      <Input
                        value={formData.secondary_color || '#1a1a1a'}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                        placeholder="#1a1a1a"
                      />
                    </div>
                    <Button onClick={() => handleSave('secondary_color')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage Sections */}
          <TabsContent value="homepage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Secties</CardTitle>
                <CardDescription>
                  Bepaal welke secties zichtbaar zijn op de homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="show_hero_section" className="text-base font-medium">
                      Hero Sectie
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toon de hero sectie met titel en call-to-action
                    </p>
                  </div>
                  <Switch
                    id="show_hero_section"
                    checked={formData.show_hero_section === 'true'}
                    onCheckedChange={(checked) => handleToggle('show_hero_section', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="show_services_section" className="text-base font-medium">
                      Diensten Sectie
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toon de diensten sectie op de homepage
                    </p>
                  </div>
                  <Switch
                    id="show_services_section"
                    checked={formData.show_services_section === 'true'}
                    onCheckedChange={(checked) => handleToggle('show_services_section', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="show_projects_section" className="text-base font-medium">
                      Projecten Sectie
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toon de projecten sectie op de homepage
                    </p>
                  </div>
                  <Switch
                    id="show_projects_section"
                    checked={formData.show_projects_section === 'true'}
                    onCheckedChange={(checked) => handleToggle('show_projects_section', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="show_testimonials_section" className="text-base font-medium">
                      Testimonials Sectie
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toon de testimonials sectie op de homepage
                    </p>
                  </div>
                  <Switch
                    id="show_testimonials_section"
                    checked={formData.show_testimonials_section === 'true'}
                    onCheckedChange={(checked) => handleToggle('show_testimonials_section', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="show_contact_section" className="text-base font-medium">
                      Contact Sectie
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toon het contactformulier op de homepage
                    </p>
                  </div>
                  <Switch
                    id="show_contact_section"
                    checked={formData.show_contact_section === 'true'}
                    onCheckedChange={(checked) => handleToggle('show_contact_section', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contactgegevens</CardTitle>
                <CardDescription>
                  E-mail, telefoon en adres
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact_email">E-mailadres</Label>
                  <div className="flex gap-2">
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('contact_email')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact_phone">Telefoonnummer</Label>
                  <div className="flex gap-2">
                    <Input
                      id="contact_phone"
                      type="tel"
                      value={formData.contact_phone || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('contact_phone')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Adres</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      value={formData.address || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('address')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Links naar social media profielen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="facebook_url"
                      value={formData.facebook_url || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, facebook_url: e.target.value }))}
                      placeholder="https://facebook.com/buildcraft"
                    />
                    <Button onClick={() => handleSave('facebook_url')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="linkedin_url"
                      value={formData.linkedin_url || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                      placeholder="https://linkedin.com/company/buildcraft"
                    />
                    <Button onClick={() => handleSave('linkedin_url')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="instagram_url"
                      value={formData.instagram_url || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram_url: e.target.value }))}
                      placeholder="https://instagram.com/buildcraft"
                    />
                    <Button onClick={() => handleSave('instagram_url')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Instellingen</CardTitle>
                <CardDescription>
                  Meta tags voor zoekmachines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meta_title"
                      value={formData.meta_title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('meta_title')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meta_description"
                      value={formData.meta_description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('meta_description')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meta_keywords"
                      value={formData.meta_keywords || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                      placeholder="bouw, constructie, nieuwbouw, renovatie"
                    />
                    <Button onClick={() => handleSave('meta_keywords')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Settings */}
          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Footer Instellingen</CardTitle>
                <CardDescription>
                  Copyright en footer tekst
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="footer_copyright">Copyright Tekst</Label>
                  <div className="flex gap-2">
                    <Input
                      id="footer_copyright"
                      value={formData.footer_copyright || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, footer_copyright: e.target.value }))}
                      placeholder="© 2025 BuildCraft. Alle rechten voorbehouden."
                    />
                    <Button onClick={() => handleSave('footer_copyright')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="footer_description">Footer Beschrijving</Label>
                  <div className="flex gap-2">
                    <Input
                      id="footer_description"
                      value={formData.footer_description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, footer_description: e.target.value }))}
                    />
                    <Button onClick={() => handleSave('footer_description')} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
