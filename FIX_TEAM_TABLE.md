# 🔧 إصلاح مشكلة جدول Team Members

## المشكلة
خطأ 500 عند محاولة حفظ عضو فريق جديد:
```
Failed query: insert into "teamMembers" ...
```

## السبب
جدول `teamMembers` غير موجود في قاعدة بيانات Railway.

## الحل

### الطريقة 1: تشغيل setup-database (موصى به)

هذا سيُنشئ جميع الجداول المفقودة:

```bash
# على Railway
railway run pnpm db:setup
```

أو إذا كنت متصل بـ Railway CLI:
```bash
railway run tsx server/setup-database.ts
```

### الطريقة 2: تشغيل script مخصص

```bash
# على Railway
railway run pnpm db:create-team-table
```

### الطريقة 3: SQL مباشر

إذا كان لديك وصول لقاعدة البيانات:

```sql
CREATE TABLE IF NOT EXISTS "teamMembers" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "position" VARCHAR(255) NOT NULL,
  "positionEn" VARCHAR(255),
  "bio" TEXT,
  "bioEn" TEXT,
  "image" VARCHAR(500) NOT NULL,
  "email" VARCHAR(320),
  "phone" VARCHAR(50),
  "order" INTEGER DEFAULT 0 NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS "teamMembers_order_idx" ON "teamMembers"("order");
```

## التحقق

بعد تشغيل الـ script، جرب:
1. افتح: https://build-production-09b2.up.railway.app/admin/team
2. اضغط "Teamlid Toevoegen"
3. املأ البيانات وارفع صورة
4. اضغط "Toevoegen"

يجب أن يعمل بدون أخطاء! ✅

## الملفات المُضافة

- `create-team-members-table.sql` - SQL script
- `create-team-members-table.ts` - TypeScript script
- تم تحديث `server/setup-database.ts` لإنشاء الجدول
- تم تحديث `package.json` بـ script جديد

## الملاحظات

- الجدول يدعم اللغتين (هولندية وإنجليزية)
- الحقول المطلوبة: name, position, image
- الحقول الاختيارية: positionEn, bio, bioEn, email, phone
- يتم الترتيب حسب حقل `order`

