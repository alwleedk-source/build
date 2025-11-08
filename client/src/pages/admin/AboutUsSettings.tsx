import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AboutUsSettings() {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  
  const { data: aboutData, isLoading } = trpc.aboutUs.get.useQuery();
  const updateMutation = trpc.aboutUs.update.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'About Us settings have been updated successfully',
      });
      utils.aboutUs.get.invalidate();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update About Us settings',
        variant: 'destructive',
      });
    },
  });

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    subtitle: '',
    subtitleEn: '',
    description: '',
    descriptionEn: '',
    image: '',
    yearsExperience: 15,
    teamSize: 50,
    projectsCompleted: 500,
    clientSatisfaction: 98,
    mission: '',
    missionEn: '',
    vision: '',
    visionEn: '',
    values: '',
    valuesEn: '',
  });

  useEffect(() => {
    if (aboutData) {
      setFormData({
        title: aboutData.title || '',
        titleEn: aboutData.titleEn || '',
        subtitle: aboutData.subtitle || '',
        subtitleEn: aboutData.subtitleEn || '',
        description: aboutData.description || '',
        descriptionEn: aboutData.descriptionEn || '',
        image: aboutData.image || '',
        yearsExperience: aboutData.yearsExperience || 15,
        teamSize: aboutData.teamSize || 50,
        projectsCompleted: aboutData.projectsCompleted || 500,
        clientSatisfaction: aboutData.clientSatisfaction || 98,
        mission: aboutData.mission || '',
        missionEn: aboutData.missionEn || '',
        vision: aboutData.vision || '',
        visionEn: aboutData.visionEn || '',
        values: aboutData.values || '',
        valuesEn: aboutData.valuesEn || '',
      });
    }
  }, [aboutData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">About Us Settings</h1>
        <p className="text-muted-foreground">
          Manage your company's About Us section content in Dutch and English
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Content */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Main Content</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Dutch) *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Over Ons"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleEn">Title (English) *</Label>
              <Input
                id="titleEn"
                value={formData.titleEn}
                onChange={(e) => handleChange('titleEn', e.target.value)}
                placeholder="About Us"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle (Dutch)</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Uw betrouwbare bouwpartner"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitleEn">Subtitle (English)</Label>
              <Input
                id="subtitleEn"
                value={formData.subtitleEn}
                onChange={(e) => handleChange('subtitleEn', e.target.value)}
                placeholder="Your trusted construction partner"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description (Dutch) *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Beschrijf uw bedrijf..."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descriptionEn">Description (English) *</Label>
              <Textarea
                id="descriptionEn"
                value={formData.descriptionEn}
                onChange={(e) => handleChange('descriptionEn', e.target.value)}
                placeholder="Describe your company..."
                rows={4}
                required
              />
            </div>
          </div>
        </Card>

        {/* Image */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Image</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {formData.image && (
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => handleChange('yearsExperience', parseInt(e.target.value))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={(e) => handleChange('teamSize', parseInt(e.target.value))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectsCompleted">Projects Completed</Label>
              <Input
                id="projectsCompleted"
                type="number"
                value={formData.projectsCompleted}
                onChange={(e) => handleChange('projectsCompleted', parseInt(e.target.value))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientSatisfaction">Client Satisfaction (%)</Label>
              <Input
                id="clientSatisfaction"
                type="number"
                value={formData.clientSatisfaction}
                onChange={(e) => handleChange('clientSatisfaction', parseInt(e.target.value))}
                min="0"
                max="100"
              />
            </div>
          </div>
        </Card>

        {/* Mission, Vision, Values */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Mission, Vision & Values</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission (Dutch)</Label>
                <Textarea
                  id="mission"
                  value={formData.mission}
                  onChange={(e) => handleChange('mission', e.target.value)}
                  placeholder="Onze missie..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="missionEn">Mission (English)</Label>
                <Textarea
                  id="missionEn"
                  value={formData.missionEn}
                  onChange={(e) => handleChange('missionEn', e.target.value)}
                  placeholder="Our mission..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision (Dutch)</Label>
                <Textarea
                  id="vision"
                  value={formData.vision}
                  onChange={(e) => handleChange('vision', e.target.value)}
                  placeholder="Onze visie..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visionEn">Vision (English)</Label>
                <Textarea
                  id="visionEn"
                  value={formData.visionEn}
                  onChange={(e) => handleChange('visionEn', e.target.value)}
                  placeholder="Our vision..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="values">Values (Dutch)</Label>
                <Textarea
                  id="values"
                  value={formData.values}
                  onChange={(e) => handleChange('values', e.target.value)}
                  placeholder="Onze waarden..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valuesEn">Values (English)</Label>
                <Textarea
                  id="valuesEn"
                  value={formData.valuesEn}
                  onChange={(e) => handleChange('valuesEn', e.target.value)}
                  placeholder="Our values..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="min-w-32"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
