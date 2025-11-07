# ⚡ البدء السريع - تشغيل Seed على Railway

## 🎯 الهدف
إنشاء المستخدم الافتراضي لحل مشكلة تسجيل الدخول.

---

## ✅ الطريقة الأسرع (5 دقائق)

### 1. ثبّت Railway CLI
```bash
# macOS/Linux
curl -fsSL https://railway.app/install.sh | sh

# أو باستخدام npm
npm install -g @railway/cli
```

### 2. سجل الدخول واربط المشروع
```bash
railway login
cd /path/to/build
railway link
```

### 3. شغّل Seed Script
```bash
railway run pnpm db:seed
```

### 4. انتظر النتيجة
يجب أن ترى:
```
🌱 Seeding initial admin...
✅ Admin created successfully!
   Email: waleed.qodami@gmail.com
   Password: 3505490qwE@@
```

### 5. جرب تسجيل الدخول
افتح: https://build-production-09b2.up.railway.app/login

**بيانات الدخول:**
- Email: `waleed.qodami@gmail.com`
- Password: `3505490qwE@@`

---

## 🔄 طريقة بديلة (بدون CLI)

### 1. افتح Railway Dashboard
https://railway.app → اختر مشروع **build**

### 2. اذهب إلى Settings
Settings → Deploy → Custom Start Command

### 3. أضف هذا الأمر مؤقتاً
```bash
pnpm db:seed && pnpm start
```

### 4. أعد النشر
Deployments → Redeploy

### 5. بعد نجاح Seed، أزل الأمر
احذف Custom Start Command وأعد النشر.

---

## 🔍 التحقق من النجاح

### فحص Logs
```bash
railway logs
```
ابحث عن: `✅ Admin created successfully!`

### فحص قاعدة البيانات
```bash
railway run psql $DATABASE_URL -c "SELECT email, name, role FROM admins;"
```

### اختبار تسجيل الدخول
افتح الموقع وجرب تسجيل الدخول.

---

## ❌ إذا فشل Seed

### المشكلة: "Admin already exists"
**الحل:** المستخدم موجود! جرب تسجيل الدخول مباشرة.

### المشكلة: "Database not available"
**الحل:** تحقق من `DATABASE_URL`:
```bash
railway variables
```

### المشكلة: لا يزال تسجيل الدخول فاشلاً
**الحل:** احذف المستخدم القديم وأعد seed:
```bash
railway run psql $DATABASE_URL -c "DELETE FROM admins WHERE email = 'waleed.qodami@gmail.com';"
railway run pnpm db:seed
```

---

## 📚 للمزيد من التفاصيل

اقرأ: `RAILWAY_SEED_GUIDE.md` - دليل شامل مع 4 طرق مختلفة.

---

**الوقت المتوقع:** 5 دقائق ⏱️
**مستوى الصعوبة:** سهل ✅
