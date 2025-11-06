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

interface SortableProjectRowProps {
  project: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleFeatured: (id: number, featured: number) => void;
  onToggleHomepage: (id: number, showOnHomepage: number) => void;
}

function SortableProjectRow({ project, onEdit, onDelete, onToggleFeatured, onToggleHomepage }: SortableProjectRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

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
            src={project.image}
            alt={project.title}
            className="w-16 h-16 object-cover rounded-lg border border-border"
          />
          <div>
            <h3 className="font-semibold text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.description}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {project.category}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFeatured(project.id, project.featured)}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.featured === 1
                ? "bg-yellow-500/10 text-yellow-600"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {project.featured === 1 ? "✓ Featured" : "Featured"}
          </button>
          <button
            onClick={() => onToggleHomepage(project.id, project.showOnHomepage)}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.showOnHomepage === 1
                ? "bg-green-500/10 text-green-600"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {project.showOnHomepage === 1 ? "✓ Homepage" : "Homepage"}
          </button>
        </div>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Projects() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  
  const projectsQuery = trpc.projects.getAll.useQuery();

  // Update local state when data changes
  useEffect(() => {
    if (projectsQuery.data) {
      const sorted = [...projectsQuery.data].sort((a, b) => a.order - b.order);
      setProjects(sorted);
    }
  }, [projectsQuery.data]);

  const deleteMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      toast.success("Project verwijderd!");
      projectsQuery.refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error("Fout bij verwijderen: " + error.message);
    },
  });

  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      projectsQuery.refetch();
    },
    onError: (error) => {
      toast.error("Fout bij bijwerken: " + error.message);
    },
  });

  const updateOrderMutation = trpc.projects.updateOrder.useMutation({
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
      setProjects((items) => {
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

  const handleToggleFeatured = (id: number, currentFeatured: number) => {
    updateMutation.mutate({
      id,
      featured: currentFeatured === 1 ? 0 : 1,
    });
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
            <h1 className="text-3xl font-bold text-foreground">Projecten</h1>
            <p className="text-muted-foreground mt-1">
              Beheer al uw bouwprojecten
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin/projects/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nieuw Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {projects.length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold text-foreground">
              {projects.filter((p) => p.featured === 1).length || 0}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Op Homepage</p>
            <p className="text-2xl font-bold text-foreground">
              {projects.filter((p) => p.showOnHomepage === 1).length || 0}
            </p>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground w-12"></th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Project
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Categorie
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
                  items={projects.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody>
                    {projects.map((project) => (
                      <SortableProjectRow
                        key={project.id}
                        project={project}
                        onEdit={(id) => setLocation(`/admin/projects/${id}`)}
                        onDelete={setDeleteId}
                        onToggleFeatured={handleToggleFeatured}
                        onToggleHomepage={handleToggleHomepage}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Geen projecten gevonden. Klik op "Nieuw Project" om te beginnen.
            </div>
          )}
        </Card>

        {/* Tip */}
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Voor geavanceerde database operaties, gebruik de
          Database UI in het Management Panel.
        </p>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet u zeker dat u dit project wilt verwijderen? Deze actie kan niet
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
