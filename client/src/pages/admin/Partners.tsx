import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, GripVertical, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortablePartnerRowProps {
  partner: any;
  onEdit: (partner: any) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: number) => void;
}

function SortablePartnerRow({ partner, onEdit, onDelete, onToggleActive }: SortablePartnerRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: partner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-border hover:bg-muted/50">
      <td className="p-4">
        <button
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={partner.logo}
            alt={partner.name}
            className="w-16 h-16 object-contain bg-white rounded-lg border border-border p-2"
          />
          <div>
            <h3 className="font-semibold text-foreground">{partner.name}</h3>
            {partner.url && (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                {partner.url}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </td>
      <td className="p-4">
        <button
          onClick={() => onToggleActive(partner.id, partner.isActive)}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            partner.isActive === 1
              ? "bg-green-500/10 text-green-600"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {partner.isActive === 1 ? "✓ Actief" : "Inactief"}
        </button>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(partner)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(partner.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Partners() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [editPartner, setEditPartner] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
  });
  
  const partnersQuery = trpc.partners.getAll.useQuery();

  // Update local state when data changes
  useEffect(() => {
    if (partnersQuery.data) {
      const sorted = [...partnersQuery.data].sort((a, b) => a.order - b.order);
      setPartners(sorted);
    }
  }, [partnersQuery.data]);

  const deleteMutation = trpc.partners.delete.useMutation({
    onSuccess: () => {
      toast.success("Partner verwijderd!");
      partnersQuery.refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Fout bij verwijderen: " + error.message);
    },
  });

  const createMutation = trpc.partners.create.useMutation({
    onSuccess: () => {
      toast.success("Partner toegevoegd!");
      partnersQuery.refetch();
      setIsDialogOpen(false);
      setFormData({ name: "", logo: "", url: "" });
    },
    onError: (error) => {
      toast.error("Fout bij toevoegen: " + error.message);
    },
  });

  const updateMutation = trpc.partners.update.useMutation({
    onSuccess: () => {
      toast.success("Partner bijgewerkt!");
      partnersQuery.refetch();
      setIsDialogOpen(false);
      setEditPartner(null);
      setFormData({ name: "", logo: "", url: "" });
    },
    onError: (error) => {
      toast.error("Fout bij bijwerken: " + error.message);
    },
  });

  const updateOrderMutation = trpc.partners.updateOrder.useMutation({
    onSuccess: () => {
      toast.success("Volgorde bijgewerkt!");
    },
    onError: (error) => {
      toast.error("Fout bij bijwerken volgorde: " + error.message);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPartners((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update order in database
        const updates = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));
        
        updateOrderMutation.mutate({ items: updates });
        
        return newItems;
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const handleToggleActive = (id: number, currentIsActive: number) => {
    updateMutation.mutate({
      id,
      isActive: currentIsActive === 1 ? 0 : 1,
    });
  };

  const handleEdit = (partner: any) => {
    setEditPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      url: partner.url || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.logo) {
      toast.error("Naam en logo zijn verplicht!");
      return;
    }

    if (editPartner) {
      updateMutation.mutate({
        id: editPartner.id,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Partners</h1>
            <p className="text-muted-foreground mt-1">
              Beheer uw partners en hun logo's
            </p>
          </div>
          <Button
            onClick={() => {
              setEditPartner(null);
              setFormData({ name: "", logo: "", url: "" });
              setIsDialogOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuwe Partner
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {partners.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Actief</p>
            <p className="text-2xl font-bold text-foreground">
              {partners.filter((p) => p.isActive === 1).length || 0}
            </p>
          </Card>
        </div>

        {/* Partners Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground w-12"></th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Partner
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Acties
                  </th>
                </tr>
              </thead>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={partners.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody>
                    {partners.map((partner) => (
                      <SortablePartnerRow
                        key={partner.id}
                        partner={partner}
                        onEdit={handleEdit}
                        onDelete={setDeleteId}
                        onToggleActive={handleToggleActive}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>

          {partners.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Geen partners gevonden. Klik op "Nieuwe Partner" om te beginnen.
            </div>
          )}
        </Card>

        {/* Tip */}
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Sleep de rijen om de volgorde te wijzigen. De wijzigingen worden automatisch opgeslagen.
        </p>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editPartner ? "Partner Bewerken" : "Nieuwe Partner"}</DialogTitle>
            <DialogDescription>
              Vul de gegevens van de partner in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Naam *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bedrijfsnaam"
              />
            </div>
            <div>
              <ImageUploader
                currentImage={formData.logo}
                onImageUploaded={(url) => setFormData({ ...formData, logo: url })}
                folder="partners"
                label="Partner Logo *"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Upload een logo (max 5MB). Ondersteunde formaten: JPEG, PNG, WebP, GIF
              </p>
            </div>
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={handleSubmit}>
              {editPartner ? "Bijwerken" : "Toevoegen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Partner verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet u zeker dat u deze partner wilt verwijderen? Deze actie kan niet
              ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
