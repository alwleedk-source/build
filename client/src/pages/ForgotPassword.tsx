import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordMutation = trpc.admin.forgotPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message || "فشل إرسال البريد الإلكتروني");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      setIsLoading(false);
      return;
    }

    forgotPasswordMutation.mutate({ email });
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
              <CardTitle className="text-2xl font-bold text-green-600">تم الإرسال بنجاح!</CardTitle>
              <CardDescription>
                تحقق من بريدك الإلكتروني
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
                <br />
                <br />
                يرجى التحقق من صندوق الوارد (وصندوق الرسائل غير المرغوب فيها).
                <br />
                <br />
                <strong>ملاحظة:</strong> الرابط صالح لمدة ساعة واحدة فقط.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة لتسجيل الدخول
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
                <Mail className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">نسيت كلمة المرور؟</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
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
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69121]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                "إرسال رابط إعادة التعيين"
              )}
            </Button>

            <Button
              type="button"
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
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
