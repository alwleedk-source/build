import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, Trash2, Edit, Lock, Shield, UserX, User } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "super_admin">("admin");
  const [newPassword, setNewPassword] = useState("");

  const utils = trpc.useUtils();
  const { data: admins, isLoading } = trpc.admin.getAll.useQuery();

  const createMutation = trpc.admin.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المدير بنجاح");
      setIsCreateDialogOpen(false);
      resetForm();
      utils.admin.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "فشل إضافة المدير");
    },
  });

  const updateMutation = trpc.admin.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث المدير بنجاح");
      setIsEditDialogOpen(false);
      resetForm();
      utils.admin.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "فشل تحديث المدير");
    },
  });

  const changePasswordMutation = trpc.admin.changePassword.useMutation({
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
      setIsPasswordDialogOpen(false);
      setNewPassword("");
    },
    onError: (error) => {
      toast.error(error.message || "فشل تغيير كلمة المرور");
    },
  });

  const deleteMutation = trpc.admin.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المدير بنجاح");
      utils.admin.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "فشل حذف المدير");
    },
  });

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setRole("admin");
    setSelectedAdmin(null);
  };

  const handleCreate = () => {
    if (!email || !password || !name) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    createMutation.mutate({ email, password, name, role });
  };

  const handleEdit = (admin: any) => {
    setSelectedAdmin(admin);
    setEmail(admin.email);
    setName(admin.name);
    setRole(admin.role);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedAdmin || !email || !name) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    updateMutation.mutate({
      id: selectedAdmin.id,
      email,
      name,
      role,
    });
  };

  const handleChangePassword = (admin: any) => {
    setSelectedAdmin(admin);
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (!selectedAdmin || !newPassword || newPassword.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    changePasswordMutation.mutate({
      id: selectedAdmin.id,
      newPassword,
    });
  };

  const handleToggleActive = (admin: any) => {
    updateMutation.mutate({
      id: admin.id,
      isActive: admin.isActive === 1 ? 0 : 1,
    });
  };

  const handleDelete = (admin: any) => {
    if (confirm(`هل أنت متأكد من حذف المدير "${admin.name}"؟`)) {
      deleteMutation.mutate({ id: admin.id });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">إدارة المدراء</h1>
            <p className="text-muted-foreground mt-1">
              إضافة وتعديل وحذف حسابات المدراء
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                إضافة مدير جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مدير جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات المدير الجديد
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أحمد محمد"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-muted-foreground">
                    يجب أن تكون 8 أحرف على الأقل
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">الدور</Label>
                  <Select value={role} onValueChange={(v: any) => setRole(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">مدير</SelectItem>
                      <SelectItem value="super_admin">مدير رئيسي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreate}
                  className="w-full"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "جاري الإضافة..." : "إضافة"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Admins Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>آخر تسجيل دخول</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    جاري التحميل...
                  </TableCell>
                </TableRow>
              ) : admins && admins.length > 0 ? (
                admins.map((admin: any) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      {admin.role === "super_admin" ? (
                        <Badge className="gap-1">
                          <Shield className="h-3 w-3" />
                          مدير رئيسي
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <User className="h-3 w-3" />
                          مدير
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {admin.isActive === 1 ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          نشط
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          غير نشط
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {admin.lastLoginAt
                        ? new Date(admin.lastLoginAt).toLocaleDateString("ar-SA")
                        : "لم يسجل دخول بعد"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(admin)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleChangePassword(admin)}
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleActive(admin)}
                        >
                          {admin.isActive === 1 ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(admin)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    لا يوجد مدراء
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل المدير</DialogTitle>
              <DialogDescription>
                تحديث بيانات المدير
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">الاسم</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">الدور</Label>
                <Select value={role} onValueChange={(v: any) => setRole(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير</SelectItem>
                    <SelectItem value="super_admin">مدير رئيسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleUpdate}
                className="w-full"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "جاري التحديث..." : "تحديث"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تغيير كلمة المرور</DialogTitle>
              <DialogDescription>
                أدخل كلمة المرور الجديدة للمدير {selectedAdmin?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">
                  يجب أن تكون 8 أحرف على الأقل
                </p>
              </div>
              <Button
                onClick={handlePasswordSubmit}
                className="w-full"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending ? "جاري التغيير..." : "تغيير كلمة المرور"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
