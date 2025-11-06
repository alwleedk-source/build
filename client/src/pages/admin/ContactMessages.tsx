import { useState } from 'react';
import { Mail, Trash2, Eye, EyeOff, Calendar, User, Phone } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  isRead: number;
  createdAt: Date;
}

export default function ContactMessages() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const { data: messages = [], refetch } = trpc.contactMessages.getAll.useQuery();
  const deleteMutation = trpc.contactMessages.delete.useMutation();
  const markAsReadMutation = trpc.contactMessages.markAsRead.useMutation();

  const unreadCount = messages.filter((m) => m.isRead === 0).length;

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success('Bericht verwijderd');
      refetch();
      setDeleteId(null);
    } catch (error) {
      toast.error('Fout bij verwijderen');
    }
  };

  const handleToggleRead = async (id: number, currentStatus: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id, isRead: currentStatus === 0 ? 1 : 0 });
      toast.success(currentStatus === 0 ? 'Gemarkeerd als gelezen' : 'Gemarkeerd als ongelezen');
      refetch();
    } catch (error) {
      toast.error('Fout bij bijwerken');
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    // Automatically mark as read when viewing
    if (message.isRead === 0) {
      try {
        await markAsReadMutation.mutateAsync({ id: message.id, isRead: 1 });
        refetch();
      } catch (error) {
        // Silent fail for marking as read
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Berichten</h1>
            <p className="text-muted-foreground mt-1">
              Bekijk en beheer contactberichten van bezoekers
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-2xl font-bold text-foreground">
              {messages.length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Ongelezen</p>
            <p className="text-2xl font-bold text-primary">
              {unreadCount}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Gelezen</p>
            <p className="text-2xl font-bold text-foreground">
              {messages.length - unreadCount}
            </p>
          </Card>
        </div>

        {/* Messages List */}
        <Card className="p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nog geen berichten ontvangen</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    message.isRead === 0
                      ? 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                      : 'bg-card hover:bg-muted/50'
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className={`font-semibold ${message.isRead === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {message.name}
                          </span>
                        </div>
                        {message.isRead === 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                            Nieuw
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{message.email}</span>
                        </div>
                        {message.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{message.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(message.createdAt)}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleRead(message.id, message.isRead)}
                        title={message.isRead === 0 ? 'Markeer als gelezen' : 'Markeer als ongelezen'}
                      >
                        {message.isRead === 0 ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(message.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bericht verwijderen?</AlertDialogTitle>
              <AlertDialogDescription>
                Deze actie kan niet ongedaan worden gemaakt. Het bericht wordt permanent verwijderd.
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

        {/* Message Detail Dialog */}
        <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Bericht Details</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Naam</p>
                    <p className="text-foreground">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Telefoon</p>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Datum</p>
                    <p className="text-foreground">{formatDate(selectedMessage.createdAt)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Bericht</p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.isRead)}
                  >
                    {selectedMessage.isRead === 0 ? 'Markeer als gelezen' : 'Markeer als ongelezen'}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Verwijderen
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
