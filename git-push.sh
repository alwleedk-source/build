#!/bin/bash

echo "🚀 دفع المشروع إلى المستودع"
echo "================================"
echo ""

cd /Users/waleed/WebstormProjects/build

# تهيئة git إذا لم يكن موجوداً
if [ ! -d .git ]; then
    echo "📦 تهيئة مستودع Git..."
    git init
    echo ""
fi

# إضافة جميع التغييرات
echo "📝 إضافة التغييرات..."
git add .

# إنشاء commit
echo "💾 إنشاء commit..."
git commit -m "تحسين صفحة Team Members: إضافة AdminLayout وتصميم احترافي

✨ التحسينات:
- إضافة AdminLayout للدمج الكامل مع لوحة الإدارة
- تحديث التصميم باستخدام Card و Button components
- ترجمة جميع النصوص إلى الهولندية
- تحسين واجهة المستخدم مع حالة فارغة
- الربط مع صفحة About Us (/over-ons)
- إضافة ملفات الإعداد والنشر (.env, deploy.sh)
- بناء التطبيق وجاهز للإنتاج

🔗 الصفحات:
- /admin/team - إدارة الفريق
- /over-ons - عرض الفريق"

echo ""
echo "✅ تم إنشاء الـ commit بنجاح!"
echo ""

# محاولة دفع التغييرات
echo "📤 محاولة دفع التغييرات..."
echo ""

# التحقق من وجود remote
if git remote | grep -q origin; then
    echo "🔗 Remote origin موجود"
    git remote -v
    echo ""

    # محاولة push
    echo "⬆️  دفع إلى main..."
    if git push origin main 2>&1; then
        echo "✅ تم الدفع بنجاح إلى main!"
    elif git push origin master 2>&1; then
        echo "✅ تم الدفع بنجاح إلى master!"
    else
        echo "⚠️  فشل الدفع. جرب يدوياً:"
        echo "   git push origin main"
        echo "   أو"
        echo "   git push origin master"
    fi
else
    echo "⚠️  لا يوجد remote origin مُعرّف"
    echo ""
    echo "لإضافة remote، استخدم:"
    echo "  git remote add origin <repository-url>"
    echo ""
    echo "إذا كان المشروع على Railway، سيتم النشر تلقائياً عند الـ push"
fi

echo ""
echo "🎉 تم!"

