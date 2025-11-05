import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function HomeSettings() {
  const [heroSettings, setHeroSettings] = useState({
    title: "Bouw uw dromen",
    subtitle: "met BuildCraft",
    description:
      "Professionele bouw- en onderhousdiensten voor uw visie. Van nieuwbouw tot renovatie, wij maken het mogelijk.",
    buttonText: "Neem Contact Op",
    stat1Value: "15+",
    stat1Label: "Jaar ervaring",
    stat2Value: "500+",
    stat2Label: "Projecten",
    stat3Value: "98%",
    stat3Label: "Tevreden klanten",
  });

  const [sectionsVisibility, setSectionsVisibility] = useState({
    hero: true,
    services: true,
    projects: true,
    testimonials: true,
    contact: true,
  });

  const handleSave = () => {
    // TODO: Save to database
    toast.success("Instellingen opgeslagen!");
    console.log("Hero Settings:", heroSettings);
    console.log("Sections Visibility:", sectionsVisibility);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Homepage Instellingen
          </h1>
          <p className="text-muted-foreground mt-1">
            Pas de homepage aan naar uw wensen
          </p>
        </div>

        {/* Hero Section Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Hero Section
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={heroSettings.title}
                onChange={(e) =>
                  setHeroSettings({ ...heroSettings, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Ondertitel</Label>
              <Input
                id="subtitle"
                value={heroSettings.subtitle}
                onChange={(e) =>
                  setHeroSettings({
                    ...heroSettings,
                    subtitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschrijving</Label>
              <Textarea
                id="description"
                value={heroSettings.description}
                onChange={(e) =>
                  setHeroSettings({
                    ...heroSettings,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buttonText">Knop Tekst</Label>
              <Input
                id="buttonText"
                value={heroSettings.buttonText}
                onChange={(e) =>
                  setHeroSettings({
                    ...heroSettings,
                    buttonText: e.target.value,
                  })
                }
              />
            </div>

            {/* Statistics */}
            <div className="border-t border-border pt-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">
                Statistieken
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat1Value">Statistiek 1 - Waarde</Label>
                  <Input
                    id="stat1Value"
                    value={heroSettings.stat1Value}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat1Value: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor="stat1Label">Label</Label>
                  <Input
                    id="stat1Label"
                    value={heroSettings.stat1Label}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat1Label: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stat2Value">Statistiek 2 - Waarde</Label>
                  <Input
                    id="stat2Value"
                    value={heroSettings.stat2Value}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat2Value: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor="stat2Label">Label</Label>
                  <Input
                    id="stat2Label"
                    value={heroSettings.stat2Label}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat2Label: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stat3Value">Statistiek 3 - Waarde</Label>
                  <Input
                    id="stat3Value"
                    value={heroSettings.stat3Value}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat3Value: e.target.value,
                      })
                    }
                  />
                  <Label htmlFor="stat3Label">Label</Label>
                  <Input
                    id="stat3Label"
                    value={heroSettings.stat3Label}
                    onChange={(e) =>
                      setHeroSettings({
                        ...heroSettings,
                        stat3Label: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sections Visibility */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Secties Zichtbaarheid
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Kies welke secties zichtbaar zijn op de homepage
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hero"
                checked={sectionsVisibility.hero}
                onCheckedChange={(checked) =>
                  setSectionsVisibility({
                    ...sectionsVisibility,
                    hero: checked as boolean,
                  })
                }
              />
              <Label htmlFor="hero" className="cursor-pointer">
                Hero Section
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="services"
                checked={sectionsVisibility.services}
                onCheckedChange={(checked) =>
                  setSectionsVisibility({
                    ...sectionsVisibility,
                    services: checked as boolean,
                  })
                }
              />
              <Label htmlFor="services" className="cursor-pointer">
                Diensten Section
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="projects"
                checked={sectionsVisibility.projects}
                onCheckedChange={(checked) =>
                  setSectionsVisibility({
                    ...sectionsVisibility,
                    projects: checked as boolean,
                  })
                }
              />
              <Label htmlFor="projects" className="cursor-pointer">
                Projecten Section
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="testimonials"
                checked={sectionsVisibility.testimonials}
                onCheckedChange={(checked) =>
                  setSectionsVisibility({
                    ...sectionsVisibility,
                    testimonials: checked as boolean,
                  })
                }
              />
              <Label htmlFor="testimonials" className="cursor-pointer">
                Testimonials Section
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="contact"
                checked={sectionsVisibility.contact}
                onCheckedChange={(checked) =>
                  setSectionsVisibility({
                    ...sectionsVisibility,
                    contact: checked as boolean,
                  })
                }
              />
              <Label htmlFor="contact" className="cursor-pointer">
                Contact Section
              </Label>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Opslaan
          </Button>
        </div>

        {/* Info */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong>Let op:</strong> Wijzigingen worden direct zichtbaar op de
            homepage na het opslaan.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
