import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Palette, Globe, Phone, Share2, Search, FileText, Code, Mail, Loader2, Layout, Info, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SettingsAdmin() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState({
    // General
    siteTitle: "BuildCraft - Professional Construction Services",
    siteDescription: "Professionele bouw- en onderhoudsdiensten voor al uw projecten",
    siteLogo: "/logo.svg",
    primaryColor: "#f59e0b",
    secondaryColor: "#1e40af",
    
    // Contact
    contactEmail: "info@buildcraft.nl",
    contactPhone: "+31 20 123 4567",
    contactAddress: "Bouwstraat 123, 1234 AB Amsterdam, Nederland",
    
    // Social
    facebookUrl: "https://facebook.com/buildcraft",
    linkedinUrl: "https://linkedin.com/company/buildcraft",
    instagramUrl: "https://instagram.com/buildcraft",
    twitterUrl: "https://twitter.com/buildcraft",
    
    // SEO
    metaTitle: "BuildCraft - Professional Construction Services",
    metaDescription: "Professionele bouw- en onderhoudsdiensten voor al uw projecten. Van nieuwbouw tot renovatie, wij maken het mogelijk.",
    metaKeywords: "bouw, constructie, nieuwbouw, renovatie, onderhoud, BuildCraft",
    
    // Footer
    footerCopyright: "© 2024 BuildCraft. Alle rechten voorbehouden.",
    footerDescription: "BuildCraft is uw betrouwbare partner voor professionele bouw- en onderhoudsdiensten.",
    
    // Analytics
    googleAnalytics: "",
    facebookPixel: "",
    customTrackingCode: "",
    
    // Homepage Sections
    showHero: true,
    showServices: true,
    showProjects: true,
    showTestimonials: true,
    showPartners: true,
    showContact: true,
  });

  // Fetch all settings from database
  const { data: allSettings, isLoading } = trpc.siteSettings.getAll.useQuery();
  const upsertMutation = trpc.siteSettings.upsert.useMutation();

  // Load settings from database
  useEffect(() => {
    if (allSettings && allSettings.length > 0) {
      const settingsObj: any = {};
      allSettings.forEach((setting) => {
        let value: any = setting.value;
        // Parse boolean and number types
        if (setting.type === 'boolean') {
          value = value === 'true' || value === '1';
        } else if (setting.type === 'number') {
          value = parseFloat(value);
        }
        settingsObj[setting.key] = value;
      });
      setSettings((prev) => ({ ...prev, ...settingsObj }));
    }
  }, [allSettings]);

  const handleSave = async (section: string) => {
    try {
      // Save all settings to database
      const settingsToSave = Object.entries(settings);
      
      for (const [key, value] of settingsToSave) {
        let type: 'text' | 'boolean' | 'number' | 'json' = 'text';
        let stringValue = String(value);
        
        if (typeof value === 'boolean') {
          type = 'boolean';
          stringValue = value ? '1' : '0';
        } else if (typeof value === 'number') {
          type = 'number';
        }
        
        await upsertMutation.mutateAsync({
          key,
          value: stringValue,
          type,
        });
      }
      
      toast.success(`${section} instellingen opgeslagen!`);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Fout bij opslaan instellingen');
    }
  };

  const handleSaveAll = async () => {
    await handleSave("Alle");
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Instellingen</h1>
            <p className="text-muted-foreground mt-1">
              Beheer alle website-instellingen
            </p>
          </div>
          <Button onClick={handleSaveAll} className="gap-2" disabled={upsertMutation.isPending}>
            {upsertMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Alles Opslaan
          </Button>
        </div>

        {/* Quick Links to Advanced Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/admin/settings/hero")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Hero Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage hero section</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/admin/settings/footer")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Footer Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage footer content</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/admin/settings/about")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">About Us Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage about section</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-9 gap-2">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Algemeen</span>
            </TabsTrigger>
            <TabsTrigger value="homepage" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Homepage</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="footer" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Footer</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Kleuren</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2" onClick={() => setLocation("/admin/settings/email")}>
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Algemene Instellingen</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteTitle">Website Titel</Label>
                    <Input
                      id="siteTitle"
                      value={settings.siteTitle}
                      onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Website Beschrijving</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteLogo">Logo URL</Label>
                    <Input
                      id="siteLogo"
                      value={settings.siteLogo}
                      onChange={(e) => setSettings({ ...settings, siteLogo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                    {settings.siteLogo && (
                      <div className="mt-2">
                        <img
                          src={settings.siteLogo}
                          alt="Logo Preview"
                          className="h-16 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={() => handleSave("Algemeen")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Homepage Tab */}
          <TabsContent value="homepage">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Homepage Secties</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Schakel secties in of uit op de homepage
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showHero">Hero Sectie</Label>
                      <p className="text-sm text-muted-foreground">Hoofdbanner met call-to-action</p>
                    </div>
                    <Switch
                      id="showHero"
                      checked={settings.showHero}
                      onCheckedChange={(checked) => setSettings({ ...settings, showHero: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showServices">Diensten Sectie</Label>
                      <p className="text-sm text-muted-foreground">Overzicht van diensten</p>
                    </div>
                    <Switch
                      id="showServices"
                      checked={settings.showServices}
                      onCheckedChange={(checked) => setSettings({ ...settings, showServices: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showProjects">Projecten Sectie</Label>
                      <p className="text-sm text-muted-foreground">Recente projecten</p>
                    </div>
                    <Switch
                      id="showProjects"
                      checked={settings.showProjects}
                      onCheckedChange={(checked) => setSettings({ ...settings, showProjects: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showTestimonials">Testimonials Sectie</Label>
                      <p className="text-sm text-muted-foreground">Klantenreviews</p>
                    </div>
                    <Switch
                      id="showTestimonials"
                      checked={settings.showTestimonials}
                      onCheckedChange={(checked) => setSettings({ ...settings, showTestimonials: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showPartners">Partners Sectie</Label>
                      <p className="text-sm text-muted-foreground">Logo's van partners</p>
                    </div>
                    <Switch
                      id="showPartners"
                      checked={settings.showPartners}
                      onCheckedChange={(checked) => setSettings({ ...settings, showPartners: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showContact">Contact Sectie</Label>
                      <p className="text-sm text-muted-foreground">Contactformulier</p>
                    </div>
                    <Switch
                      id="showContact"
                      checked={settings.showContact}
                      onCheckedChange={(checked) => setSettings({ ...settings, showContact: checked })}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Homepage")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Informatie</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Telefoon</Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactAddress">Adres</Label>
                    <Textarea
                      id="contactAddress"
                      value={settings.contactAddress}
                      onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Contact")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebookUrl">Facebook URL</Label>
                    <Input
                      id="facebookUrl"
                      value={settings.facebookUrl}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={settings.linkedinUrl}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagramUrl">Instagram URL</Label>
                    <Input
                      id="instagramUrl"
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/yourpage"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterUrl">Twitter URL</Label>
                    <Input
                      id="twitterUrl"
                      value={settings.twitterUrl}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/yourpage"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Social")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">SEO Instellingen</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Titel</Label>
                    <Input
                      id="metaTitle"
                      value={settings.metaTitle}
                      onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Beschrijving</Label>
                    <Textarea
                      id="metaDescription"
                      value={settings.metaDescription}
                      onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      value={settings.metaKeywords}
                      onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("SEO")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Footer Instellingen</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="footerCopyright">Copyright Tekst</Label>
                    <Input
                      id="footerCopyright"
                      value={settings.footerCopyright}
                      onChange={(e) => setSettings({ ...settings, footerCopyright: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="footerDescription">Footer Beschrijving</Label>
                    <Textarea
                      id="footerDescription"
                      value={settings.footerDescription}
                      onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Footer")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Kleur Instellingen</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primaire Kleur</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        placeholder="#f59e0b"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secundaire Kleur</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        placeholder="#1e40af"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleSave("Kleuren")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Analytics & Tracking</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                    <Input
                      id="googleAnalytics"
                      value={settings.googleAnalytics}
                      onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                    <Input
                      id="facebookPixel"
                      value={settings.facebookPixel}
                      onChange={(e) => setSettings({ ...settings, facebookPixel: e.target.value })}
                      placeholder="123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customTrackingCode">Custom Tracking Code</Label>
                    <Textarea
                      id="customTrackingCode"
                      value={settings.customTrackingCode}
                      onChange={(e) => setSettings({ ...settings, customTrackingCode: e.target.value })}
                      rows={5}
                      placeholder="<script>...</script>"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Analytics")} className="mt-4" disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
