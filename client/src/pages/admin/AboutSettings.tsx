import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';

export default function AboutSettings() {
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    subtitle: '',
    subtitleEn: '',
    description: '',
    descriptionEn: '',
    mission: '',
    missionEn: '',
    vision: '',
    visionEn: '',
    values: '',
    valuesEn: '',
    yearsExperience: 0,
    projectsCompleted: 0,
    happyClients: 0,
    teamMembers: 0,
    image: '',
  });

  const [existingId, setExistingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data: aboutData, isLoading } = trpc.aboutUs.get.useQuery();
  const createMutation = trpc.aboutUs.create.useMutation();
  const updateMutation = trpc.aboutUs.update.useMutation();

  useEffect(() => {
    if (aboutData) {
      setFormData({
        title: aboutData.title || '',
        titleEn: aboutData.titleEn || '',
        subtitle: aboutData.subtitle || '',
        subtitleEn: aboutData.subtitleEn || '',
        description: aboutData.description || '',
        descriptionEn: aboutData.descriptionEn || '',
        mission: aboutData.mission || '',
        missionEn: aboutData.missionEn || '',
        vision: aboutData.vision || '',
        visionEn: aboutData.visionEn || '',
        values: aboutData.values || '',
        valuesEn: aboutData.valuesEn || '',
        yearsExperience: aboutData.yearsExperience || 0,
        projectsCompleted: aboutData.projectsCompleted || 0,
        happyClients: aboutData.happyClients || 0,
        teamMembers: aboutData.teamMembers || 0,
        image: aboutData.image || '',
      });
      setExistingId(aboutData.id);
    }
  }, [aboutData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (existingId) {
        await updateMutation.mutateAsync({
          id: existingId,
          ...formData,
        });
        alert('About Us instellingen bijgewerkt!');
      } else {
        const result = await createMutation.mutateAsync(formData);
        setExistingId(result.id);
        alert('About Us instellingen aangemaakt!');
      }
    } catch (error) {
      console.error('Error saving about us:', error);
      alert('Er is een fout opgetreden bij het opslaan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Experience') || name.includes('Completed') || name.includes('Clients') || name.includes('Members')
        ? parseInt(value) || 0
        : value,
    }));
  };

  if (isLoading) {
    return <div className="p-6">Laden...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">About Us Instellingen</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
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
              Beschrijving (Nederlands) *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
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
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Missie (Nederlands)
            </label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mission (English)
            </label>
            <textarea
              name="missionEn"
              value={formData.missionEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Vision */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Visie (Nederlands)
            </label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Vision (English)
            </label>
            <textarea
              name="visionEn"
              value={formData.visionEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Waarden (Nederlands) - JSON array
            </label>
            <textarea
              name="values"
              value={formData.values}
              onChange={handleChange}
              rows={3}
              placeholder='["Kwaliteit", "Betrouwbaarheid", "Innovatie"]'
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Values (English) - JSON array
            </label>
            <textarea
              name="valuesEn"
              value={formData.valuesEn}
              onChange={handleChange}
              rows={3}
              placeholder='["Quality", "Reliability", "Innovation"]'
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Jaren Ervaring
            </label>
            <input
              type="number"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Projecten Voltooid
            </label>
            <input
              type="number"
              name="projectsCompleted"
              value={formData.projectsCompleted}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Tevreden Klanten
            </label>
            <input
              type="number"
              name="happyClients"
              value={formData.happyClients}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Teamleden
            </label>
            <input
              type="number"
              name="teamMembers"
              value={formData.teamMembers}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Afbeelding URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://example.com/image.jpg"
          />
        </div>

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
