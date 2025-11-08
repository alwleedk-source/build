import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function HomeSettings() {
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroTitleEn: "",
    heroSubtitle: "",
    heroSubtitleEn: "",
    heroDescription: "",
    heroDescriptionEn: "",
    stat1Value: "",
    stat1Label: "",
    stat1LabelEn: "",
    stat2Value: "",
    stat2Label: "",
    stat2LabelEn: "",
    stat3Value: "",
    stat3Label: "",
    stat3LabelEn: "",
  });

  const settingsQuery = trpc.homeSettings.get.useQuery();
  const updateMutation = trpc.homeSettings.update.useMutation({
    onSuccess: () => {
      toast.success("Instellingen opgeslagen!");
      settingsQuery.refetch();
    },
    onError: (error) => {
      toast.error("Fout bij opslaan: " + error.message);
    },
  });

  useEffect(() => {
    if (settingsQuery.data) {
      setFormData(settingsQuery.data);
    }
  }, [settingsQuery.data]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const isLoading = updateMutation.isPending || settingsQuery.isLoading;

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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Titel (Nederlands)</Label>
                <Input
                  id="heroTitle"
                  value={formData.heroTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, heroTitle: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroTitleEn">Title (English)</Label>
                <Input
                  id="heroTitleEn"
                  value={formData.heroTitleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, heroTitleEn: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Ondertitel (Nederlands)</Label>
                <Input
                  id="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, heroSubtitle: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSubtitleEn">Subtitle (English)</Label>
                <Input
                  id="heroSubtitleEn"
                  value={formData.heroSubtitleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, heroSubtitleEn: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroDescription">Beschrijving (Nederlands)</Label>
                <Textarea
                  id="heroDescription"
                  value={formData.heroDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, heroDescription: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroDescriptionEn">Description (English)</Label>
                <Textarea
                  id="heroDescriptionEn"
                  value={formData.heroDescriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, heroDescriptionEn: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Statistieken
          </h2>
          <div className="space-y-6">
            {/* Stat 1 */}
            <div>
              <h3 className="font-medium mb-3">Statistiek 1</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat1Value">Waarde</Label>
                  <Input
                    id="stat1Value"
                    value={formData.stat1Value}
                    onChange={(e) =>
                      setFormData({ ...formData, stat1Value: e.target.value })
                    }
                    placeholder="15+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat1Label">Label (Nederlands)</Label>
                  <Input
                    id="stat1Label"
                    value={formData.stat1Label}
                    onChange={(e) =>
                      setFormData({ ...formData, stat1Label: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat1LabelEn">Label (English)</Label>
                  <Input
                    id="stat1LabelEn"
                    value={formData.stat1LabelEn}
                    onChange={(e) =>
                      setFormData({ ...formData, stat1LabelEn: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <h3 className="font-medium mb-3">Statistiek 2</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat2Value">Waarde</Label>
                  <Input
                    id="stat2Value"
                    value={formData.stat2Value}
                    onChange={(e) =>
                      setFormData({ ...formData, stat2Value: e.target.value })
                    }
                    placeholder="500+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat2Label">Label (Nederlands)</Label>
                  <Input
                    id="stat2Label"
                    value={formData.stat2Label}
                    onChange={(e) =>
                      setFormData({ ...formData, stat2Label: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat2LabelEn">Label (English)</Label>
                  <Input
                    id="stat2LabelEn"
                    value={formData.stat2LabelEn}
                    onChange={(e) =>
                      setFormData({ ...formData, stat2LabelEn: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div>
              <h3 className="font-medium mb-3">Statistiek 3</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat3Value">Waarde</Label>
                  <Input
                    id="stat3Value"
                    value={formData.stat3Value}
                    onChange={(e) =>
                      setFormData({ ...formData, stat3Value: e.target.value })
                    }
                    placeholder="98%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat3Label">Label (Nederlands)</Label>
                  <Input
                    id="stat3Label"
                    value={formData.stat3Label}
                    onChange={(e) =>
                      setFormData({ ...formData, stat3Label: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat3LabelEn">Label (English)</Label>
                  <Input
                    id="stat3LabelEn"
                    value={formData.stat3LabelEn}
                    onChange={(e) =>
                      setFormData({ ...formData, stat3LabelEn: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
