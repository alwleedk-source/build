import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Plus, Edit, Trash2, Save, X, Users as UsersIcon } from 'lucide-react';
import ImageUploaderR2 from '@/components/admin/ImageUploaderR2';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  positionEn?: string | null;
  bio?: string | null;
  bioEn?: string | null;
  image: string;
  email?: string | null;
  phone?: string | null;
  order: number;
}

interface TeamMemberForm {
  name: string;
  position: string;
  positionEn: string;
  bio: string;
  bioEn: string;
  image: string;
  email: string;
  phone: string;
}

export default function TeamMembers() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<TeamMemberForm>({
    name: '',
    position: '',
    positionEn: '',
    bio: '',
    bioEn: '',
    image: '',
    email: '',
    phone: '',
  });

  const { data: teamMembers, refetch } = trpc.teamMembers.getAll.useQuery();
  const createMutation = trpc.teamMembers.create.useMutation();
  const updateMutation = trpc.teamMembers.update.useMutation();
  const deleteMutation = trpc.teamMembers.delete.useMutation();

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      positionEn: '',
      bio: '',
      bioEn: '',
      image: '',
      email: '',
      phone: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      positionEn: member.positionEn || '',
      bio: member.bio || '',
      bioEn: member.bioEn || '',
      image: member.image,
      email: member.email || '',
      phone: member.phone || '',
    });
    setEditingId(member.id);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.image) {
      alert('Vul alle verplichte velden in (Naam, Functie, Afbeelding)');
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        alert('Teamlid succesvol bijgewerkt!');
      } else {
        await createMutation.mutateAsync(formData);
        alert('Teamlid succesvol toegevoegd!');
      }
      refetch();
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Fout bij opslaan teamlid');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Weet u zeker dat u dit teamlid wilt verwijderen?')) return;

    try {
      await deleteMutation.mutateAsync({ id });
      alert('Teamlid succesvol verwijderd!');
      refetch();
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Fout bij verwijderen teamlid');
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <UsersIcon className="w-8 h-8 text-primary" />
              Team Leden
            </h1>
            <p className="text-muted-foreground mt-1">
              Beheer uw teamleden die worden weergegeven op de Over Ons pagina
            </p>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Teamlid Toevoegen
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingId ? 'Teamlid Bewerken' : 'Nieuw Teamlid Toevoegen'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetForm}
              >
                <X size={24} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                    placeholder="bijv. Jan Jansen"
                  />
                </div>

                {/* Position (Dutch) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Functie (Nederlands) *
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                    placeholder="bijv. Projectmanager"
                  />
                </div>

                {/* Position (English) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Functie (Engels)
                  </label>
                  <input
                    type="text"
                    value={formData.positionEn}
                    onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="e.g. Project Manager"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="naam@bedrijf.nl"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="+31 6 12345678"
                  />
                </div>
              </div>

              {/* Bio (Dutch) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Biografie (Nederlands)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Schrijf een korte biografie..."
                />
              </div>

              {/* Bio (English) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Biografie (Engels)
                </label>
                <textarea
                  value={formData.bioEn}
                  onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Write a short biography..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Afbeelding *
                </label>
                <ImageUploaderR2
                  currentImage={formData.image}
                  onUploadSuccess={handleImageUpload}
                  folder="team"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                >
                  <Save size={20} />
                  {editingId ? 'Bijwerken' : 'Toevoegen'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Annuleren
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Team Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers?.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                  {member.positionEn && (
                    <p className="text-muted-foreground text-sm">{member.positionEn}</p>
                  )}
                </div>

                {member.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                )}

                <div className="space-y-1">
                  {member.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      📧 {member.email}
                    </p>
                  )}
                  {member.phone && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      📞 {member.phone}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Bewerken
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Verwijderen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {teamMembers?.length === 0 && !isAdding && (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <UsersIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nog geen teamleden
                </h3>
                <p className="text-muted-foreground mb-4">
                  Voeg uw eerste teamlid toe om te beginnen
                </p>
              </div>
              <Button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2"
              >
                <Plus size={20} />
                Eerste Teamlid Toevoegen
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

