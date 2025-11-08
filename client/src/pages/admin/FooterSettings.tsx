import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';

export default function FooterSettings() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    companyDescriptionEn: '',
    address: '',
    phone: '',
    email: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    copyrightText: '',
    copyrightTextEn: '',
  });

  const [existingId, setExistingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data: footerData, isLoading } = trpc.footerSettings.get.useQuery();
  const createMutation = trpc.footerSettings.create.useMutation();
  const updateMutation = trpc.footerSettings.update.useMutation();

  useEffect(() => {
    if (footerData) {
      setFormData({
        companyName: footerData.companyName || '',
        companyDescription: footerData.companyDescription || '',
        companyDescriptionEn: footerData.companyDescriptionEn || '',
        address: footerData.address || '',
        phone: footerData.phone || '',
        email: footerData.email || '',
        facebookUrl: footerData.facebookUrl || '',
        twitterUrl: footerData.twitterUrl || '',
        linkedinUrl: footerData.linkedinUrl || '',
        instagramUrl: footerData.instagramUrl || '',
        youtubeUrl: footerData.youtubeUrl || '',
        copyrightText: footerData.copyrightText || '',
        copyrightTextEn: footerData.copyrightTextEn || '',
      });
      setExistingId(footerData.id);
    }
  }, [footerData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (existingId) {
        await updateMutation.mutateAsync({
          id: existingId,
          ...formData,
        });
        alert('Footer bijgewerkt!');
      } else {
        const result = await createMutation.mutateAsync(formData);
        setExistingId(result.id);
        alert('Footer aangemaakt!');
      }
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Er is een fout opgetreden bij het opslaan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div className="p-6">Laden...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Footer Instellingen</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Bedrijfsnaam *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Company Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Bedrijfsbeschrijving (Nederlands)
            </label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Description (English)
            </label>
            <textarea
              name="companyDescriptionEn"
              value={formData.companyDescriptionEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium">Contactgegevens</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Adres
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Straatnaam 123, 1234 AB Amsterdam"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Telefoon
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="+31 20 123 4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="info@bedrijf.nl"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium">Social Media</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://facebook.com/bedrijf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://twitter.com/bedrijf"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://linkedin.com/company/bedrijf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://instagram.com/bedrijf"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://youtube.com/c/bedrijf"
            />
          </div>
        </div>

        {/* Copyright Text */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Copyright Tekst (Nederlands)
            </label>
            <input
              type="text"
              name="copyrightText"
              value={formData.copyrightText}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="© 2024 Bedrijfsnaam. Alle rechten voorbehouden."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Copyright Text (English)
            </label>
            <input
              type="text"
              name="copyrightTextEn"
              value={formData.copyrightTextEn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="© 2024 Company Name. All rights reserved."
            />
          </div>
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
