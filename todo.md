# BuildCraft Pro - TODO List

## Phase 1: إعداد التصميم والألوان والخطوط
- [x] تطبيق ألوان Socialectric (خلفية فاتحة، أصفر/ذهبي للأزرار)
- [x] إضافة خط Inter من Google Fonts
- [x] إعداد CSS Variables للألوان

## Phase 2: بناء Hero Section وHeader
- [x] بناء Header شفاف مع قائمة تنقل
- [x] بناء Hero Section مع رسوم خطية
- [x] إضافة أزرار CTA مع أيقونات
- [x] إضافة badge "New Availability"

## Phase 3: بناء باقي الأقسام
- [x] قسم الخدمات (Services)
- [x] قسم من نحن (About) مع الإحصائيات
- [x] قسم المشاريع (Projects)
- [x] قسم الشهادات (Testimonials)
- [x] قسم التواصل (Contact)
- [x] Footer

## Phase 4: اختبار ونشر
- [x] اختبار الموقع على جميع الأجهزة
- [x] حفظ checkpoint
- [x] تسليم الرابط

## تحسينات جديدة - قسم المشاريع
- [x] إضافة فلاتر تفاعلية لتصنيف المشاريع (الكل، سكني، تجاري، صناعي)
- [x] إضافة مشاريع إضافية لكل تصنيف
- [x] تطبيق تأثيرات انتقالية عند التبديل بين الفلاتر
- [x] اختبار الفلاتر والتأكد من عملها بشكل صحيح

## تحسينات جديدة - صفحات منفصلة وتصحيح اللغة
- [x] تصحيح لغة الفلاتر من العربية إلى الهولندية (Alle, Residentieel, Commercieel, Industrieel)
- [x] إنشاء صفحة /projecten لعرض جميع المشاريع
- [x] إنشاء صفحة /diensten لعرض جميع الخدمات
- [x] تحديث الصفحة الرئيسية لعرض 6 مشاريع فقط
- [x] ربط روابط "Bekijk alle projecten" و "Bekijk alle diensten" بالصفحات الجديدة
- [x] إضافة نظام لاختيار المشاريع المعروضة في الصفحة الرئيسية

## تحسينات تأثيرات Hover
- [x] إضافة تأثير zoom على صور المشاريع عند التمرير
- [x] إضافة overlay داكن مع معلومات إضافية على المشاريع
- [x] إضافة تأثير رفع (lift) للبطاقات
- [x] تحسين تأثيرات الخدمات مع حركة الأيقونات
- [x] إضافة تأثيرات انتقالية سلسة

## ترقية شاملة - نظام إدارة محتوى متكامل

### Phase 1: ترقية المشروع
- [x] ترقية المشروع إلى web-db-user
- [x] إعداد قاعدة البيانات

### Phase 2: قاعدة البيانات والنماذج
- [x] إنشاء جدول Projects في قاعدة البيانات
- [x] إنشاء جدول Services في قاعدة البيانات
- [x] إنشاء جدول BlogPosts في قاعدة البيانات
- [x] إنشاء API endpoints للمشاريع
- [x] إنشاء API endpoints للخدمات
- [x] إنشاء API endpoints للمقالات

### Phase 3: صفحة Over Ons
- [x] تصميم صفحة Over Ons
- [x] إضافة قسم قصة الشركة
- [x] إضافة قسم الفريق
- [x] إضافة قسم القيم والرؤية

### Phase 4: صفحات منفصلة للخدمات (SEO)
- [x] إنشاء صفحة /diensten/nieuwbouw
- [x] إنشاء صفحة /diensten/renovatie
- [x] إنشاء صفحة /diensten/afwerking
- [x] إنشاء صفحة /diensten/onderhoud
- [x] إنشاء صفحة /diensten/commerciele-bouw
- [x] إنشاء صفحة /diensten/industriele-bouw
- [ ] إضافة SEO meta tags لكل صفحة

### Phase 5: نظام Blog
- [x] إنشاء صفحة /blog (قائمة المقالات)
- [x] إنشاء صفحة /blog/[slug] (مقال واحد)
- [x] إضافة نظام التصنيفات
- [ ] إضافة نظام البحث

### Phase 6: لوحة التحكم
- [x] إنشاء صفحة /admin
- [x] إدارة المشاريع (CRUD + featured) - عبر Database UI
- [x] إدارة الخدمات (CRUD + homepage display) - عبر Database UI
- [x] إدارة مقالات Blog (CRUD) - عبر Database UI
- [ ] نظام رفع الصور
- [x] نظام المصادقة والحماية

### Phase 7: Scroll Animations
- [x] إضافة useScrollAnimation hook
- [x] تأثيرات fade-in للأقسام
- [x] تأثيرات slide-up للبطاقات
- [x] إنشاء FadeIn component
- [x] تحسين تأثيرات الصفحة الرئيسية

### Phase 8: اختبار نهائي
- [x] اختبار جميع صفحات الموقع
- [x] اختبار لوحة التحكم
- [x] اختبار إضافة/تعديل/حذف المحتوى - عبر Database UI
- [x] اختبار الـ SEO - صفحات منفصلة لكل خدمة
- [x] حفظ checkpoint نهائي

## صفحة تسجيل الدخول
- [ ] إنشاء صفحة Login
- [ ] إضافة زر تسجيل الدخول في Header
- [ ] ربط Manus OAuth
- [ ] اختبار تسجيل الدخول والوصول إلى Admin

## نظام تسجيل دخول مستقل
- [x] إنشاء صفحة Login مع username/password
- [x] إضافة نظام مصادقة بسيط (localStorage-based)
- [x] حماية صفحة Admin
- [x] إضافة زر Login/Logout في Header
- [x] إنشاء حساب admin افتراضي (admin / BuildCraft2024!)
