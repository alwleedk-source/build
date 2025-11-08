# حل سريع لمشكلة تسجيل الدخول

## المشكلة
لا يمكن تسجيل الدخول لأن المستخدم الافتراضي غير موجود في قاعدة البيانات على Railway.

## الحل السريع (5 دقائق)

### الخطوة 1: تثبيت Railway CLI
```bash
npm install -g @railway/cli
```

### الخطوة 2: تسجيل الدخول والربط
```bash
# تسجيل الدخول إلى Railway
railway login

# الانتقال إلى مجلد المشروع
cd /path/to/build

# ربط المشروع
railway link
```

### الخطوة 3: تشغيل seed script
```bash
railway run npx tsx server/seed-admin-pg.ts
```

### الخطوة 4: التحقق
افتح المتصفح وانتقل إلى:
```
https://build-production-09b2.up.railway.app/login
```

استخدم بيانات الاعتماد:
- **البريد الإلكتروني:** waleed.qodami@gmail.com
- **كلمة المرور:** 3505490qwE@@

---

## حل بديل: استخدام Neon SQL Editor

إذا لم تتمكن من استخدام Railway CLI:

### الخطوة 1: توليد password hash
قم بتشغيل هذا الكود في Node.js محلياً:

```javascript
const bcrypt = require('bcrypt');
bcrypt.hash('3505490qwE@@', 12, (err, hash) => {
  console.log(hash);
});
```

### الخطوة 2: تشغيل SQL في Neon
1. افتح Neon Dashboard: https://neon.tech
2. اختر قاعدة البيانات الخاصة بك
3. افتح SQL Editor
4. قم بتشغيل:

```sql
INSERT INTO admins (email, password_hash, name, role, is_active, created_at, updated_at)
VALUES (
  'waleed.qodami@gmail.com',
  '[PASTE_HASH_HERE]',
  'Waleed Qodami',
  'super_admin',
  1,
  NOW(),
  NOW()
);
```

---

## حل دائم: إضافة seed إلى عملية النشر

لتجنب هذه المشكلة في المستقبل، قم بتعديل `package.json`:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js",
    "seed": "npx tsx server/seed-admin-pg.ts || true",
    "postbuild": "npm run seed"
  }
}
```

أو أضف إلى `railway.json`:

```json
{
  "build": {
    "builder": "DOCKERFILE"
  },
  "deploy": {
    "startCommand": "npm run seed && npm start"
  }
}
```

---

## التحقق من نجاح العملية

بعد تشغيل seed script، يجب أن ترى:
```
✅ Admin created successfully!
Email: waleed.qodami@gmail.com
Password: 3505490qwE@@
```

أو إذا كان المستخدم موجوداً بالفعل:
```
⚠️  Admin already exists
```

---

## استكشاف الأخطاء

### خطأ: "DATABASE_URL is required"
تأكد من أن متغير البيئة `DATABASE_URL` موجود في Railway.

### خطأ: "Connection refused"
تحقق من أن قاعدة بيانات Neon نشطة وليست متوقفة.

### خطأ: "Table 'admins' doesn't exist"
قم بتشغيل migrations أولاً:
```bash
railway run pnpm drizzle-kit push
```

---

**ملاحظة:** هذا الحل يجب أن يحل المشكلة فوراً. إذا استمرت المشكلة، تحقق من logs في Railway.
