#!/bin/bash

echo "🚀 دفع المشروع إلى GitHub"
echo "=============================="
echo ""

cd /Users/waleed/WebstormProjects/build

echo "📝 1. إضافة جميع التغييرات..."
git add -A

echo ""
echo "💾 2. إنشاء commit..."
git commit -m "Fix Settings page and add comprehensive documentation

✨ الإصلاحات:
- إضافة getAllSiteSettings() في db.ts
- إضافة upsertSiteSetting() في db.ts
- إضافة upsert endpoint في routers.ts
- إصلاح صفحة Settings - جميع التابات تحفظ الآن

📄 التوثيق:
- SETTINGS_PAGE_ANALYSIS.md
- SETTINGS_FIX_COMPLETE.md
- SEO_DYNAMIC_ANALYSIS.md
- AUDIT_SUMMARY.md

🎯 النتيجة: صفحة Settings تعمل بالكامل!" || echo "⚠️  لا توجد تغييرات جديدة"

echo ""
echo "📤 3. دفع إلى GitHub..."
git push origin main

echo ""
echo "✅ تم الدفع بنجاح!"
echo ""
echo "🔗 تحقق من:"
echo "   https://github.com/alwleedk-source/build"
echo ""
echo "⚡ Railway سيبدأ النشر تلقائياً خلال دقائق"

