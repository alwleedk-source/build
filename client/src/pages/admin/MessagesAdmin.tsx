import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Mail, MailOpen, Trash2, Phone, User } from "lucide-react";

export default function MessagesAdmin() {
  const { data: messages, isLoading, refetch } = trpc.messages.getAll.useQuery();
  const updateStatusMutation = trpc.messages.updateStatus.useMutation();
  const deleteMutation = trpc.messages.delete.useMutation();

  const handleMarkAsRead = async (id: number, currentStatus: number) => {
    try {
      await updateStatusMutation.mutateAsync({ id, isRead: currentStatus === 0 ? 1 : 0 });
      toast.success(currentStatus === 0 ? "Gemarkeerd als gelezen" : "Gemarkeerd als ongelezen");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Bericht verwijderd!");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Berichten</h1>
          <p className="text-muted-foreground">Beheer contactberichten</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : messages && messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <Mail className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Geen berichten ontvangen</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {messages?.map((message) => (
              <Card key={message.id} className={message.isRead === 0 ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{message.name}</CardTitle>
                        {message.isRead === 0 && (
                          <Badge variant="default">Nieuw</Badge>
                        )}
                      </div>
                      <CardDescription>
                        {formatDate(message.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id, message.isRead)}
                      >
                        {message.isRead === 0 ? (
                          <MailOpen className="w-4 h-4" />
                        ) : (
                          <Mail className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${message.email}`} className="hover:underline">
                      {message.email}
                    </a>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${message.phone}`} className="hover:underline">
                        {message.phone}
                      </a>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
