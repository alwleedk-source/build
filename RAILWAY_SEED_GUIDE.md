# 🚂 دليل تشغيل Seed Script على Railway

## 📋 نظرة عامة

هذا الدليل يشرح كيفية تشغيل seed script لإنشاء المستخدم الافتراضي على Railway.

---

## ✅ الطريقة 1: استخدام Railway CLI (الموصى بها) ⭐

### الخطوة 1: تثبيت Railway CLI

#### على macOS/Linux:
```bash
curl -fsSL https://railway.app/install.sh | sh
```

#### على Windows (PowerShell):
```powershell
iwr https://railway.app/install.ps1 | iex
```

#### أو باستخدام npm:
```bash
npm install -g @railway/cli
```

### الخطوة 2: تسجيل الدخول
```bash
railway login
```
سيفتح المتصفح لتسجيل الدخول.

### الخطوة 3: ربط المشروع
```bash
cd /path/to/build
railway link
```
اختر المشروع الصحيح من القائمة.

### الخطوة 4: تشغيل Seed Script
```bash
railway run pnpm db:seed
```

**النتيجة المتوقعة:**
```
🌱 Seeding initial admin...
✅ Admin created successfully!
   Email: waleed.qodami@gmail.com
   Name: Waleed Qodami
   Role: super_admin
   ID: 1

🔐 Login credentials:
   Email: waleed.qodami@gmail.com
   Password: 3505490qwE@@

✅ Seed completed!
```

### الخطوة 5: اختبار تسجيل الدخول
افتح: https://build-production-09b2.up.railway.app/login

---

## ✅ الطريقة 2: استخدام Railway Dashboard

### الخطوة 1: افتح Railway Dashboard
1. اذهب إلى: https://railway.app
2. سجل الدخول
3. اختر المشروع **build**

### الخطوة 2: افتح Settings
1. اضغط على المشروع
2. اذهب إلى **Settings** tab

### الخطوة 3: إضافة Custom Start Command (مؤقت)
1. في قسم **Deploy**
2. ابحث عن **Custom Start Command**
3. أضف:
   ```bash
   pnpm db:seed && pnpm start
   ```
4. احفظ التغييرات

### الخطوة 4: إعادة النشر
1. اذهب إلى **Deployments** tab
2. اضغط **Redeploy**
3. انتظر حتى ينتهي النشر

### الخطوة 5: إزالة Custom Start Command
بعد نجاح seed، أزل Custom Start Command وأعد إلى:
```bash
pnpm start
```
ثم أعد النشر مرة أخرى.

---

## ✅ الطريقة 3: إضافة Seed إلى Build Command

### الخطوة 1: تحديث package.json
أضف seed إلى build script:

```json
{
  "scripts": {
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && pnpm db:seed"
  }
}
```

### الخطوة 2: Push إلى GitHub
```bash
git add package.json
git commit -m "Add seed to build process"
git push origin main
```

### الخطوة 3: انتظر إعادة النشر
Railway سيعيد النشر تلقائياً وسيشغل seed script.

⚠️ **تحذير:** هذه الطريقة ستشغل seed في كل مرة يتم فيها build. قد ترغب في إزالتها بعد أول نشر ناجح.

---

## ✅ الطريقة 4: استخدام Railway Run Command (الأسرع)

### الخطوة 1: افتح Terminal في Railway Dashboard
1. اذهب إلى المشروع
2. اضغط على **...** (More Options)
3. اختر **Open Shell** أو **Run Command**

### الخطوة 2: نفذ الأمر
```bash
cd /app && pnpm db:seed
```

---

## 🔍 التحقق من نجاح Seed

### الطريقة 1: فحص Logs
```bash
railway logs
```
ابحث عن:
```
✅ Admin created successfully!
```

### الطريقة 2: التحقق من قاعدة البيانات
```bash
railway run psql $DATABASE_URL -c "SELECT id, email, name, role FROM admins WHERE email = 'waleed.qodami@gmail.com';"
```

يجب أن ترى:
```
 id |          email           |     name      |    role     
----+--------------------------+---------------+-------------
  1 | waleed.qodami@gmail.com  | Waleed Qodami | super_admin
```

### الطريقة 3: اختبار تسجيل الدخول
1. افتح: https://build-production-09b2.up.railway.app/login
2. أدخل:
   - Email: waleed.qodami@gmail.com
   - Password: 3505490qwE@@
3. اضغط **Inloggen**
4. يجب أن تنتقل إلى `/admin` ✅

---

## 🛠️ حل المشاكل

### المشكلة: "Admin already exists"
**الحل:** المستخدم موجود بالفعل. جرب تسجيل الدخول مباشرة.

إذا كنت تريد إعادة إنشاء المستخدم:
```bash
railway run psql $DATABASE_URL -c "DELETE FROM admins WHERE email = 'waleed.qodami@gmail.com';"
railway run pnpm db:seed
```

### المشكلة: "Database not available"
**الحل:** تأكد من أن `DATABASE_URL` موجود في Environment Variables:
```bash
railway variables
```

إذا لم يكن موجوداً، أضفه:
```bash
railway variables set DATABASE_URL="postgresql://..."
```

### المشكلة: "Command not found: pnpm"
**الحل:** استخدم npm بدلاً من pnpm:
```bash
railway run npm run db:seed
```

### المشكلة: لا يزال تسجيل الدخول فاشلاً بعد seed
**الحل:** تحقق من:
1. أن seed تم بنجاح (فحص logs)
2. أن المستخدم موجود في قاعدة البيانات
3. أن `isActive = 1`
4. أن كلمة المرور صحيحة: `3505490qwE@@`

---

## 📝 ملاحظات مهمة

### 1. Seed Script آمن للتشغيل المتكرر
- إذا كان المستخدم موجوداً، سيتخطى الإنشاء
- لن يحذف أو يعدل المستخدمين الموجودين

### 2. تغيير كلمة المرور
بعد أول تسجيل دخول، غيّر كلمة المرور من لوحة التحكم.

### 3. إضافة مستخدمين جدد
بعد تسجيل الدخول، يمكنك إضافة مستخدمين جدد من لوحة التحكم.

---

## 🎯 الخلاصة

### الطريقة الموصى بها:
1. ✅ ثبّت Railway CLI
2. ✅ سجل الدخول: `railway login`
3. ✅ اربط المشروع: `railway link`
4. ✅ شغّل seed: `railway run pnpm db:seed`
5. ✅ جرب تسجيل الدخول

### الوقت المتوقع:
⏱️ 5-10 دقائق (أول مرة)
⏱️ 1-2 دقيقة (بعد تثبيت CLI)

---

## 📞 الدعم

إذا واجهت مشاكل:

1. **فحص logs:**
   ```bash
   railway logs
   ```

2. **فحص قاعدة البيانات:**
   ```bash
   railway run psql $DATABASE_URL -c "\dt"
   ```

3. **إعادة تشغيل seed:**
   ```bash
   railway run pnpm db:seed
   ```

---

**الحالة:** ✅ جاهز للتطبيق
**آخر تحديث:** 7 نوفمبر 2025
