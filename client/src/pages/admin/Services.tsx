import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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

interface SortableServiceRowProps {
  service: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleHomepage: (id: number, showOnHomepage: number) => void;
}

function SortableServiceRow({ service, onEdit, onDelete, onToggleHomepage }: SortableServiceRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

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
        <div>
          <h3 className="font-semibold text-foreground">{service.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {service.description}
          </p>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm text-muted-foreground">{service.slug}</span>
      </td>
      <td className="p-4">
        <button
          onClick={() => onToggleHomepage(service.id, service.showOnHomepage)}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            service.showOnHomepage === 1
              ? "bg-green-500/10 text-green-600"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {service.showOnHomepage === 1 ? "✓ Homepage" : "Homepage"}
        </button>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(service.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Services() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [services, setServices] = useState<any[]>([]);
  
  const servicesQuery = trpc.services.getAll.useQuery();

  // Update local state when data changes
  useEffect(() => {
    if (servicesQuery.data) {
      const sorted = [...servicesQuery.data].sort((a, b) => a.order - b.order);
      setServices(sorted);
    }
  }, [servicesQuery.data]);

  const deleteMutation = trpc.services.delete.useMutation({
    onSuccess: () => {
      toast.success("Dienst verwijderd!");
      servicesQuery.refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Fout bij verwijderen: " + error.message);
    },
  });

  const updateMutation = trpc.services.update.useMutation({
    onSuccess: () => {
      servicesQuery.refetch();
    },
    onError: (error) => {
      toast.error("Fout bij bijwerken: " + error.message);
    },
  });

  const updateOrderMutation = trpc.services.updateOrder.useMutation({
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
      setServices((items) => {
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

  const handleToggleHomepage = (id: number, currentShowOnHomepage: number) => {
    updateMutation.mutate({
      id,
      showOnHomepage: currentShowOnHomepage === 1 ? 0 : 1,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Diensten</h1>
            <p className="text-muted-foreground mt-1">
              Beheer al uw diensten
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin/services/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuwe Dienst
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {services.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Op Homepage</p>
            <p className="text-2xl font-bold text-foreground">
              {services.filter((s) => s.showOnHomepage === 1).length || 0}
            </p>
          </Card>
        </div>

        {/* Services Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground w-12"></th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Dienst
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Slug
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
                  items={services.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody>
                    {services.map((service) => (
                      <SortableServiceRow
                        key={service.id}
                        service={service}
                        onEdit={(id) => setLocation(`/admin/services/${id}`)}
                        onDelete={setDeleteId}
                        onToggleHomepage={handleToggleHomepage}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>

          {services.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Geen diensten gevonden. Klik op "Nieuwe Dienst" om te beginnen.
            </div>
          )}
        </Card>

        {/* Tip */}
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Sleep de rijen om de volgorde te wijzigen. De wijzigingen worden automatisch opgeslagen.
        </p>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dienst verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet u zeker dat u deze dienst wilt verwijderen? Deze actie kan niet
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
