import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("رابط إعادة تعيين كلمة المرور غير صالح");
    }
  }, [token]);

  const resetPasswordMutation = trpc.admin.resetPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setIsLoading(false);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || "فشل إعادة تعيين كلمة المرور");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("رابط إعادة تعيين كلمة المرور غير صالح");
      return;
    }

    if (newPassword.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    setIsLoading(true);
    resetPasswordMutation.mutate({ token, newPassword });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-green-600">تم التغيير بنجاح!</CardTitle>
              <CardDescription>
                تم إعادة تعيين كلمة المرور الخاصة بك
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800 text-center">
                تم إعادة تعيين كلمة المرور بنجاح!
                <br />
                <br />
                سيتم توجيهك لصفحة تسجيل الدخول خلال 3 ثوانٍ...
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => setLocation("/login")}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028]"
            >
              تسجيل الدخول الآن
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            {APP_LOGO ? (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-auto" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">إعادة تعيين كلمة المرور</CardTitle>
            <CardDescription>
              أدخل كلمة المرور الجديدة
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading || !token}
                  className="pr-10"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500">
                يجب أن تكون كلمة المرور 8 أحرف على الأقل
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || !token}
                  className="pr-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69121]"
              disabled={isLoading || !token}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري التغيير...
                </>
              ) : (
                "إعادة تعيين كلمة المرور"
              )}
            </Button>

            <Button
              type="button"
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              العودة لتسجيل الدخول
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {APP_TITLE}</p>
            <p className="mt-1">جميع الحقوق محفوظة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
