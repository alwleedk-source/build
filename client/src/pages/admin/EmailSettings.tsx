import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Loader2, Mail, Server, User, Lock, Send, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EmailSettings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "",
    fromName: "BuildCraft",
    autoReplyEnabled: 0,
    autoReplySubject: "Bedankt voor uw bericht",
    autoReplyMessage: "",
    notificationEnabled: 0,
    notificationEmail: "",
  });

  const { data: emailSettings, isLoading } = trpc.emailSettings.get.useQuery();
  const upsertMutation = trpc.emailSettings.upsert.useMutation();

  useEffect(() => {
    if (emailSettings) {
      setFormData({
        smtpHost: emailSettings.smtpHost || "",
        smtpPort: emailSettings.smtpPort || 587,
        smtpUser: emailSettings.smtpUser || "",
        smtpPassword: emailSettings.smtpPassword || "",
        fromEmail: emailSettings.fromEmail || "",
        fromName: emailSettings.fromName || "BuildCraft",
        autoReplyEnabled: emailSettings.autoReplyEnabled || 0,
        autoReplySubject: emailSettings.autoReplySubject || "Bedankt voor uw bericht",
        autoReplyMessage: emailSettings.autoReplyMessage || "",
        notificationEnabled: emailSettings.notificationEnabled || 0,
        notificationEmail: emailSettings.notificationEmail || "",
      });
    }
  }, [emailSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await upsertMutation.mutateAsync(formData);
      toast.success("Email instellingen succesvol opgeslagen!");
    } catch (error) {
      console.error("Error saving email settings:", error);
      toast.error("Fout bij opslaan van email instellingen");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Email Instellingen</h1>
          <p className="text-muted-foreground">
            Configureer SMTP-instellingen voor automatische email antwoorden
          </p>
        </div>

        {/* SMTP Setup Instructions */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>SMTP Configuratie Vereist</AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p>
              Om automatische emails te versturen, heeft u geldige SMTP-inloggegevens nodig van uw emailprovider.
            </p>
            <div className="mt-3">
              <p className="font-semibold mb-2">Populaire SMTP Providers:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <strong>Gmail:</strong> smtp.gmail.com:587 (vereist App Password - zie{" "}
                  <a
                    href="https://support.google.com/accounts/answer/185833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    instructies
                  </a>
                  )
                </li>
                <li>
                  <strong>SendGrid:</strong> smtp.sendgrid.net:587 (gratis tier beschikbaar)
                </li>
                <li>
                  <strong>Mailgun:</strong> smtp.mailgun.org:587 (gratis tier beschikbaar)
                </li>
                <li>
                  <strong>Office 365:</strong> smtp.office365.com:587
                </li>
              </ul>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200">Let op:</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Voor Gmail moet u een "App Password" gebruiken in plaats van uw normale wachtwoord.
                    Normale Gmail-wachtwoorden werken niet voor SMTP-authenticatie.
                  </p>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SMTP Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                SMTP Server Instellingen
              </CardTitle>
              <CardDescription>
                Configureer uw SMTP server voor het verzenden van emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host *</Label>
                  <Input
                    id="smtpHost"
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={formData.smtpHost}
                    onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port *</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    placeholder="587"
                    value={formData.smtpPort}
                    onChange={(e) => setFormData({ ...formData, smtpPort: parseInt(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Gebruik 587 voor TLS of 465 voor SSL
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Gebruikersnaam *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="smtpUser"
                      type="text"
                      placeholder="your-email@gmail.com"
                      className="pl-10"
                      value={formData.smtpUser}
                      onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Wachtwoord *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="smtpPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.smtpPassword}
                      onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sender Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Afzender Instellingen
              </CardTitle>
              <CardDescription>
                Configureer de afzender informatie voor uitgaande emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Van Email *</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    placeholder="info@buildcraft.nl"
                    value={formData.fromEmail}
                    onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">Van Naam</Label>
                  <Input
                    id="fromName"
                    type="text"
                    placeholder="BuildCraft"
                    value={formData.fromName}
                    onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Reply Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Automatisch Antwoord
              </CardTitle>
              <CardDescription>
                Configureer automatische antwoord emails voor nieuwe berichten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoReplyEnabled">Automatisch antwoord inschakelen</Label>
                  <p className="text-sm text-muted-foreground">
                    Verstuur automatisch een bevestigingsmail naar klanten
                  </p>
                </div>
                <Switch
                  id="autoReplyEnabled"
                  checked={formData.autoReplyEnabled === 1}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, autoReplyEnabled: checked ? 1 : 0 })
                  }
                />
              </div>

              {formData.autoReplyEnabled === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="autoReplySubject">Email Onderwerp</Label>
                    <Input
                      id="autoReplySubject"
                      type="text"
                      placeholder="Bedankt voor uw bericht"
                      value={formData.autoReplySubject}
                      onChange={(e) => setFormData({ ...formData, autoReplySubject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autoReplyMessage">Email Bericht (HTML)</Label>
                    <Textarea
                      id="autoReplyMessage"
                      rows={8}
                      placeholder="<p>Beste {naam},</p><p>Hartelijk dank voor uw bericht...</p>"
                      value={formData.autoReplyMessage}
                      onChange={(e) => setFormData({ ...formData, autoReplyMessage: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Gebruik {"{naam}"} om de naam van de klant in te voegen. Laat leeg voor standaard bericht.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Admin Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Admin Notificaties
              </CardTitle>
              <CardDescription>
                Ontvang een email notificatie wanneer een nieuwe bericht binnenkomt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificationEnabled">Notificaties inschakelen</Label>
                  <p className="text-sm text-muted-foreground">
                    Verstuur een email naar de beheerder bij nieuwe berichten
                  </p>
                </div>
                <Switch
                  id="notificationEnabled"
                  checked={formData.notificationEnabled === 1}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notificationEnabled: checked ? 1 : 0 })
                  }
                />
              </div>

              {formData.notificationEnabled === 1 && (
                <div className="space-y-2">
                  <Label htmlFor="notificationEmail">Notificatie Email *</Label>
                  <Input
                    id="notificationEmail"
                    type="email"
                    placeholder="admin@buildcraft.nl"
                    value={formData.notificationEmail}
                    onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Dit email adres ontvangt notificaties wanneer klanten een bericht versturen
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Opslaan...
                </>
              ) : (
                "Opslaan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
