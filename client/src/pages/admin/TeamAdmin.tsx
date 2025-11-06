import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";

export default function TeamAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    email: "",
    phone: "",
    order: 0,
  });

  const { data: team, isLoading, refetch } = trpc.team.getAll.useQuery();
  const createMutation = trpc.team.create.useMutation();
  const updateMutation = trpc.team.update.useMutation();
  const deleteMutation = trpc.team.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Teamlid bijgewerkt!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Teamlid toegevoegd!");
      }
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    }
  };

  const handleEdit = (member: any) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || "",
      image: member.image,
      email: member.email || "",
      phone: member.phone || "",
      order: member.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit teamlid wilt verwijderen?")) return;
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Teamlid verwijderd!");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      bio: "",
      image: "",
      email: "",
      phone: "",
      order: 0,
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground">Beheer teamleden</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Nieuw Teamlid
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team?.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover mb-3"
                        />
                      )}
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.position}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Teamlid Bewerken" : "Nieuw Teamlid"}
              </DialogTitle>
              <DialogDescription>
                Vul de gegevens in voor het teamlid
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Naam *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Functie *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Afbeelding URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefoon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Volgorde</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuleren
                </Button>
                <Button type="submit">
                  {editingId ? "Bijwerken" : "Toevoegen"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
