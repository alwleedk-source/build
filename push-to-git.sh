#!/bin/bash

# الألوان
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 دفع المشروع إلى Git Repository   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

cd /Users/waleed/WebstormProjects/build

# 1. تحقق من Git
echo -e "${YELLOW}[1/5]${NC} التحقق من Git..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git غير مثبت!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git مثبت${NC}"
echo ""

# 2. تهيئة Git
echo -e "${YELLOW}[2/5]${NC} تهيئة المستودع..."
if [ ! -d .git ]; then
    git init
    echo -e "${GREEN}✅ تم تهيئة Git${NC}"
else
    echo -e "${GREEN}✅ Git مهيأ مسبقاً${NC}"
fi
echo ""

# 3. إضافة الملفات
echo -e "${YELLOW}[3/5]${NC} إضافة الملفات..."
git add .
echo -e "${GREEN}✅ تم إضافة جميع الملفات${NC}"
echo ""

# 4. إنشاء Commit
echo -e "${YELLOW}[4/5]${NC} إنشاء Commit..."
git commit -m "تحسين صفحة Team Members: إضافة AdminLayout وتصميم احترافي

✨ التحسينات الرئيسية:
- دمج كامل مع AdminLayout في لوحة الإدارة
- تصميم جديد باستخدام Card و Button components
- ترجمة كاملة للنصوص إلى الهولندية
- تحسين واجهة المستخدم مع حالة فارغة مفيدة
- ربط تام مع صفحة About Us (/over-ons)
- إضافة ملفات الإعداد والنشر
- بناء التطبيق وجاهز للإنتاج

📁 الملفات المحدثة:
- client/src/pages/admin/TeamMembers.tsx
- .env, deploy.sh, وملفات توثيق

🔗 الصفحات:
- /admin/team - إدارة أعضاء الفريق
- /over-ons - عرض الفريق للزوار" || echo -e "${YELLOW}⚠️  لا توجد تغييرات جديدة${NC}"

echo -e "${GREEN}✅ تم إنشاء Commit${NC}"
echo ""

# 5. التحقق من Remote
echo -e "${YELLOW}[5/5]${NC} التحقق من Remote..."
if git remote | grep -q "origin"; then
    echo -e "${GREEN}✅ Remote origin موجود${NC}"
    echo ""
    echo -e "${BLUE}📍 Remote URL:${NC}"
    git remote -v | head -2
    echo ""

    # محاولة Push
    echo -e "${BLUE}📤 دفع التغييرات...${NC}"
    echo ""

    if git push origin main 2>&1; then
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║         ✅ تم الدفع بنجاح!             ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${BLUE}🎉 Railway سيبدأ في النشر تلقائياً!${NC}"
        echo ""
        echo -e "${BLUE}🔗 الروابط:${NC}"
        echo "   Admin: https://build-production-09b2.up.railway.app/admin/team"
        echo "   Website: https://build-production-09b2.up.railway.app/over-ons"
    elif git push origin master 2>&1; then
        echo ""
        echo -e "${GREEN}✅ تم الدفع بنجاح إلى master!${NC}"
    else
        echo ""
        echo -e "${YELLOW}⚠️  تعذر الدفع تلقائياً${NC}"
        echo ""
        echo -e "${BLUE}💡 جرب يدوياً:${NC}"
        echo "   git push origin main"
        echo "   أو"
        echo "   git push origin master"
    fi
else
    echo -e "${YELLOW}⚠️  Remote origin غير معرّف${NC}"
    echo ""
    echo -e "${BLUE}📝 لإضافة Remote، شغّل:${NC}"
    echo ""
    echo "   git remote add origin <repository-url>"
    echo ""
    echo -e "${BLUE}مثال:${NC}"
    echo "   git remote add origin https://github.com/username/repo.git"
    echo ""
    echo -e "${BLUE}ثم ادفع:${NC}"
    echo "   git push -u origin main"
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}💡 إذا لم يكن لديك Repository:${NC}"
    echo ""
    echo "   1. أنشئ repository على GitHub:"
    echo "      https://github.com/new"
    echo ""
    echo "   2. انسخ رابط الـ repository"
    echo ""
    echo "   3. أضفه كـ remote:"
    echo "      git remote add origin <الرابط-المنسوخ>"
    echo ""
    echo "   4. ادفع:"
    echo "      git push -u origin main"
    echo ""
fi

echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              📊 الملخص                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Git مهيأ${NC}"
echo -e "${GREEN}✅ الملفات مضافة${NC}"
echo -e "${GREEN}✅ Commit تم إنشاؤه${NC}"
echo ""
echo -e "${BLUE}📁 عدد الملفات المعدلة:${NC}"
git diff --cached --numstat | wc -l | awk '{print "   " $1 " ملف"}'
echo ""
echo -e "${BLUE}🎯 الخطوة التالية:${NC}"
echo "   راجع GIT_PUSH_GUIDE.md للتفاصيل"
echo ""

