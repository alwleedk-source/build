import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import ImageUploaderR2 from '../../components/admin/ImageUploaderR2';

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
      alert('Please fill in all required fields (Name, Position, Image)');
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        alert('Team member updated successfully!');
      } else {
        await createMutation.mutateAsync(formData);
        alert('Team member created successfully!');
      }
      refetch();
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Error saving team member');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      alert('Team member deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Error deleting team member');
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {editingId ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Position (Dutch) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position (Dutch) *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Position (English) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position (English)
                </label>
                <input
                  type="text"
                  value={formData.positionEn}
                  onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Bio (Dutch) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio (Dutch)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio (English) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio (English)
              </label>
              <textarea
                value={formData.bioEn}
                onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image *
              </label>
              <ImageUploaderR2
                currentImage={formData.image}
                onUploadSuccess={handleImageUpload}
                folder="team"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Save size={20} />
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers?.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{member.position}</p>
              {member.positionEn && (
                <p className="text-gray-500 text-sm mb-2">{member.positionEn}</p>
              )}
              {member.bio && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{member.bio}</p>
              )}
              {member.email && (
                <p className="text-sm text-gray-500 mb-1">📧 {member.email}</p>
              )}
              {member.phone && (
                <p className="text-sm text-gray-500 mb-3">📞 {member.phone}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teamMembers?.length === 0 && !isAdding && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">No team members yet</p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Your First Team Member
          </button>
        </div>
      )}
    </div>
  );
}
