import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import AdminLayout from '@/components/admin/AdminLayout';

export default function HeroSettings() {
  return (
    <AdminLayout>
      <HeroSettingsContent />
    </AdminLayout>
  );
}

function HeroSettingsContent() {
  const [formData, setFormData] = useState({
    style: 'classic' as 'classic' | 'split' | 'minimal' | 'fullBackground' | 'videoBackground',
    title: '',
    titleEn: '',
    subtitle: '',
    subtitleEn: '',
    description: '',
    descriptionEn: '',
    backgroundImage: '',
    videoUrl: '',
    overlayOpacity: 50,
    textAlignment: 'center',
    primaryButtonText: '',
    primaryButtonTextEn: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonTextEn: '',
    secondaryButtonLink: '',
    showStats: 1,
    stat1Value: 0,
    stat1Label: '',
    stat1LabelEn: '',
    stat2Value: 0,
    stat2Label: '',
    stat2LabelEn: '',
    stat3Value: 0,
    stat3Label: '',
    stat3LabelEn: '',
    stat4Value: 0,
    stat4Label: '',
    stat4LabelEn: '',
  });

  const [existingId, setExistingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data: heroData, isLoading } = trpc.heroSection.get.useQuery();
  const createMutation = trpc.heroSection.create.useMutation();
  const updateMutation = trpc.heroSection.update.useMutation();

  useEffect(() => {
    if (heroData) {
      setFormData({
        style: heroData.style || 'classic',
        title: heroData.title || '',
        titleEn: heroData.titleEn || '',
        subtitle: heroData.subtitle || '',
        subtitleEn: heroData.subtitleEn || '',
        description: heroData.description || '',
        descriptionEn: heroData.descriptionEn || '',
        backgroundImage: heroData.backgroundImage || '',
        videoUrl: heroData.videoUrl || '',
        overlayOpacity: heroData.overlayOpacity || 50,
        textAlignment: heroData.textAlignment || 'center',
        primaryButtonText: heroData.primaryButtonText || '',
        primaryButtonTextEn: heroData.primaryButtonTextEn || '',
        primaryButtonLink: heroData.primaryButtonLink || '',
        secondaryButtonText: heroData.secondaryButtonText || '',
        secondaryButtonTextEn: heroData.secondaryButtonTextEn || '',
        secondaryButtonLink: heroData.secondaryButtonLink || '',
        showStats: heroData.showStats ?? 1,
        stat1Value: heroData.stat1Value || 0,
        stat1Label: heroData.stat1Label || '',
        stat1LabelEn: heroData.stat1LabelEn || '',
        stat2Value: heroData.stat2Value || 0,
        stat2Label: heroData.stat2Label || '',
        stat2LabelEn: heroData.stat2LabelEn || '',
        stat3Value: heroData.stat3Value || 0,
        stat3Label: heroData.stat3Label || '',
        stat3LabelEn: heroData.stat3LabelEn || '',
        stat4Value: heroData.stat4Value || 0,
        stat4Label: heroData.stat4Label || '',
        stat4LabelEn: heroData.stat4LabelEn || '',
      });
      setExistingId(heroData.id);
    }
  }, [heroData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (existingId) {
        await updateMutation.mutateAsync({
          id: existingId,
          ...formData,
        });
        alert('Hero Section bijgewerkt!');
      } else {
        const result = await createMutation.mutateAsync(formData);
        setExistingId(result.id);
        alert('Hero Section aangemaakt!');
      }
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Er is een fout opgetreden bij het opslaan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Value') || name === 'overlayOpacity' || name === 'showStats'
        ? parseInt(value) || 0
        : value,
    }));
  };

  if (isLoading) {
    return <div className="p-6">Laden...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hero Section Instellingen</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Stijl *
          </label>
          <select
            name="style"
            value={formData.style}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="classic">Classic - Klassiek (Tekst in het midden)</option>
            <option value="split">Split - Gesplitst (Tekst links, afbeelding rechts)</option>
            <option value="minimal">Minimal - Minimaal (Eenvoudig en elegant)</option>
            <option value="fullBackground">Full Background - Volledige achtergrond</option>
            <option value="videoBackground">Video Background - Video achtergrond</option>
          </select>
        </div>

        {/* Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Titel (Nederlands) *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Title (English)
            </label>
            <input
              type="text"
              name="titleEn"
              value={formData.titleEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Ondertitel (Nederlands)
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Subtitle (English)
            </label>
            <input
              type="text"
              name="subtitleEn"
              value={formData.subtitleEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Beschrijving (Nederlands)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description (English)
            </label>
            <textarea
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Background Image & Video */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Achtergrond Afbeelding URL
            </label>
            <input
              type="text"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/hero-bg.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Video URL (voor Video Background stijl)
            </label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/hero-video.mp4"
            />
          </div>
        </div>

        {/* Overlay & Text Alignment */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Overlay Opacity (0-100)
            </label>
            <input
              type="number"
              name="overlayOpacity"
              value={formData.overlayOpacity}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Tekstuitlijning
            </label>
            <select
              name="textAlignment"
              value={formData.textAlignment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="left">Links</option>
              <option value="center">Midden</option>
              <option value="right">Rechts</option>
            </select>
          </div>
        </div>

        {/* Primary Button */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Primaire Knop Tekst (NL)
            </label>
            <input
              type="text"
              name="primaryButtonText"
              value={formData.primaryButtonText}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Primary Button Text (EN)
            </label>
            <input
              type="text"
              name="primaryButtonTextEn"
              value={formData.primaryButtonTextEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Primaire Knop Link
            </label>
            <input
              type="text"
              name="primaryButtonLink"
              value={formData.primaryButtonLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/contact"
            />
          </div>
        </div>

        {/* Secondary Button */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Secundaire Knop Tekst (NL)
            </label>
            <input
              type="text"
              name="secondaryButtonText"
              value={formData.secondaryButtonText}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Secondary Button Text (EN)
            </label>
            <input
              type="text"
              name="secondaryButtonTextEn"
              value={formData.secondaryButtonTextEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Secundaire Knop Link
            </label>
            <input
              type="text"
              name="secondaryButtonLink"
              value={formData.secondaryButtonLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/diensten"
            />
          </div>
        </div>

        {/* Show Stats Toggle */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showStats"
              checked={formData.showStats === 1}
              onChange={(e) => setFormData(prev => ({ ...prev, showStats: e.target.checked ? 1 : 0 }))}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Toon Statistieken</span>
          </label>
        </div>

        {/* Statistics */}
        {formData.showStats === 1 && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium">Statistieken</h3>
            
            {/* Stat 1 */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stat 1 Waarde</label>
                <input
                  type="number"
                  name="stat1Value"
                  value={formData.stat1Value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 1 Label (NL)</label>
                <input
                  type="text"
                  name="stat1Label"
                  value={formData.stat1Label}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 1 Label (EN)</label>
                <input
                  type="text"
                  name="stat1LabelEn"
                  value={formData.stat1LabelEn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stat 2 Waarde</label>
                <input
                  type="number"
                  name="stat2Value"
                  value={formData.stat2Value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 2 Label (NL)</label>
                <input
                  type="text"
                  name="stat2Label"
                  value={formData.stat2Label}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 2 Label (EN)</label>
                <input
                  type="text"
                  name="stat2LabelEn"
                  value={formData.stat2LabelEn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stat 3 Waarde</label>
                <input
                  type="number"
                  name="stat3Value"
                  value={formData.stat3Value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 3 Label (NL)</label>
                <input
                  type="text"
                  name="stat3Label"
                  value={formData.stat3Label}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 3 Label (EN)</label>
                <input
                  type="text"
                  name="stat3LabelEn"
                  value={formData.stat3LabelEn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stat 4 Waarde</label>
                <input
                  type="number"
                  name="stat4Value"
                  value={formData.stat4Value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 4 Label (NL)</label>
                <input
                  type="text"
                  name="stat4Label"
                  value={formData.stat4Label}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stat 4 Label (EN)</label>
                <input
                  type="text"
                  name="stat4LabelEn"
                  value={formData.stat4LabelEn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Opslaan...' : existingId ? 'Bijwerken' : 'Aanmaken'}
          </button>
        </div>
      </form>
    </div>
  );
}
