import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Palette, Globe, Phone, Share2, Search, FileText, Code } from "lucide-react";
import { toast } from "sonner";

export default function SettingsAdmin() {
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

  const handleSave = (section: string) => {
    toast.success(`${section} instellingen opgeslagen!`);
  };

  const handleSaveAll = () => {
    toast.success("Alle instellingen opgeslagen!");
  };

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
          <Button onClick={handleSaveAll} className="gap-2">
            <Save className="w-4 h-4" />
            Alles Opslaan
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 gap-2">
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
                <Button onClick={() => handleSave("Algemeen")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
                <Button onClick={() => handleSave("Homepage")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contactgegevens</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactEmail">E-mailadres</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Telefoonnummer</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
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
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Contact")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={settings.linkedinUrl}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagramUrl">Instagram URL</Label>
                    <Input
                      id="instagramUrl"
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterUrl">Twitter URL</Label>
                    <Input
                      id="twitterUrl"
                      value={settings.twitterUrl}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Social Media")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={settings.metaTitle}
                      onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
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
                <Button onClick={() => handleSave("SEO")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
                    <Label htmlFor="footerCopyright">Copyright Text</Label>
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
                <Button onClick={() => handleSave("Footer")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Kleurenschema</h2>
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
                <Button onClick={() => handleSave("Kleuren")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
                    <Label htmlFor="googleAnalytics">Google Analytics Code</Label>
                    <Textarea
                      id="googleAnalytics"
                      value={settings.googleAnalytics}
                      onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
                      rows={4}
                      placeholder="<!-- Google Analytics Code -->"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebookPixel">Facebook Pixel Code</Label>
                    <Textarea
                      id="facebookPixel"
                      value={settings.facebookPixel}
                      onChange={(e) => setSettings({ ...settings, facebookPixel: e.target.value })}
                      rows={4}
                      placeholder="<!-- Facebook Pixel Code -->"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customTrackingCode">Custom Tracking Code</Label>
                    <Textarea
                      id="customTrackingCode"
                      value={settings.customTrackingCode}
                      onChange={(e) => setSettings({ ...settings, customTrackingCode: e.target.value })}
                      rows={4}
                      placeholder="<!-- Custom Tracking Code -->"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Analytics")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
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
