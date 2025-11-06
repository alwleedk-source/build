import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
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

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company?: string | null;
  content: string;
  rating: number;
  image?: string | null;
  order: number;
}

interface TestimonialFormData {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

function SortableTestimonialRow({ testimonial, onEdit, onDelete }: {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: testimonial.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-muted/50">
      <td className="p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </td>
      <td className="p-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg font-semibold text-muted-foreground">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
      </td>
      <td className="p-4 font-medium">{testimonial.name}</td>
      <td className="p-4 text-muted-foreground">{testimonial.position}</td>
      <td className="p-4 text-muted-foreground">{testimonial.company || '-'}</td>
      <td className="p-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'fill-primary text-primary'
                  : 'text-muted'
              }`}
            />
          ))}
        </div>
      </td>
      <td className="p-4 max-w-xs truncate text-muted-foreground">
        {testimonial.content}
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(testimonial)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(testimonial.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function TestimonialsAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
  });

  const { data: testimonials = [], refetch } = trpc.testimonials.getAll.useQuery();
  const createMutation = trpc.testimonials.create.useMutation();
  const updateMutation = trpc.testimonials.update.useMutation();
  const deleteMutation = trpc.testimonials.delete.useMutation();
  const updateOrderMutation = trpc.testimonials.updateOrder.useMutation();

  const [sortedTestimonials, setSortedTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setSortedTestimonials(testimonials);
  }, [testimonials]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedTestimonials.findIndex((t) => t.id === active.id);
      const newIndex = sortedTestimonials.findIndex((t) => t.id === over.id);

      const newOrder = arrayMove(sortedTestimonials, oldIndex, newIndex);
      setSortedTestimonials(newOrder);

      const updates = newOrder.map((testimonial, index) => ({
        id: testimonial.id,
        order: index,
      }));

      try {
        await updateOrderMutation.mutateAsync(updates);
        toast.success('Volgorde bijgewerkt');
        refetch();
      } catch (error) {
        toast.error('Fout bij bijwerken volgorde');
        setSortedTestimonials(testimonials);
      }
    }
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        company: testimonial.company || '',
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image || '',
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        image: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTestimonial(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        await updateMutation.mutateAsync({
          id: editingTestimonial.id,
          ...formData,
          company: formData.company || undefined,
          image: formData.image || undefined,
        });
        toast.success('Testimonial bijgewerkt');
      } else {
        await createMutation.mutateAsync({
          ...formData,
          company: formData.company || undefined,
          image: formData.image || undefined,
        });
        toast.success('Testimonial toegevoegd');
      }
      refetch();
      handleCloseDialog();
    } catch (error) {
      toast.error('Fout bij opslaan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Weet je zeker dat je deze testimonial wilt verwijderen?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success('Testimonial verwijderd');
      refetch();
    } catch (error) {
      toast.error('Fout bij verwijderen');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-2">
            Beheer klantbeoordelingen en feedback
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Nieuwe Testimonial
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-1">Totaal</p>
          <p className="text-3xl font-bold">{testimonials.length}</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-1">Gemiddelde Rating</p>
          <p className="text-3xl font-bold">
            {testimonials.length > 0
              ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
              : '0.0'}
            <span className="text-lg text-muted-foreground ml-1">/ 5.0</span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-4 text-left font-semibold w-12"></th>
                <th className="p-4 text-left font-semibold">Foto</th>
                <th className="p-4 text-left font-semibold">Naam</th>
                <th className="p-4 text-left font-semibold">Functie</th>
                <th className="p-4 text-left font-semibold">Bedrijf</th>
                <th className="p-4 text-left font-semibold">Rating</th>
                <th className="p-4 text-left font-semibold">Bericht</th>
                <th className="p-4 text-left font-semibold">Acties</th>
              </tr>
            </thead>
            <tbody>
              {sortedTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    Geen testimonials gevonden
                  </td>
                </tr>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sortedTestimonials.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {sortedTestimonials.map((testimonial) => (
                      <SortableTestimonialRow
                        key={testimonial.id}
                        testimonial={testimonial}
                        onEdit={handleOpenDialog}
                        onDelete={handleDelete}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-sm text-muted-foreground border-t bg-muted/20">
          💡 Tip: Sleep de rijen om de volgorde te wijzigen
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Testimonial Bewerken' : 'Nieuwe Testimonial'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Functie *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bedrijf
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bericht *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className="p-2 hover:bg-muted rounded transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= formData.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Foto URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
                placeholder="https://example.com/photo.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuleren
              </Button>
              <Button type="submit">
                {editingTestimonial ? 'Bijwerken' : 'Toevoegen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
