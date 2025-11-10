#!/bin/bash

echo "================================================"
echo "   📊 تقرير حالة المشروع - Git Status"
echo "================================================"
echo ""

cd /Users/waleed/WebstormProjects/build

# 1. Check Git
if [ -d .git ]; then
    echo "✅ Git Repository: موجود"
else
    echo "❌ Git Repository: غير موجود"
    git init
    echo "✅ تم تهيئة Git"
fi

echo ""

# 2. Check commits
COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
if [ "$COMMITS" -gt "0" ]; then
    echo "✅ Commits: $COMMITS commit(s)"
    echo "   آخر commit:"
    git log --oneline -1 2>/dev/null | sed 's/^/   /'
else
    echo "⚠️  لا توجد commits"
    echo "   جاري إنشاء commit..."
    git add -A
    git commit -m "Team Members improvements with AdminLayout"
    echo "✅ تم إنشاء commit"
fi

echo ""

# 3. Check remote
REMOTE=$(git config --get remote.origin.url 2>/dev/null)
if [ -n "$REMOTE" ]; then
    echo "✅ Remote Origin: موجود"
    echo "   URL: $REMOTE"
    echo ""
    echo "📤 محاولة الدفع..."
    if git push origin main 2>&1; then
        echo "✅ تم الدفع بنجاح!"
        echo ""
        echo "🎉 Railway سينشر التحديثات تلقائياً!"
        echo ""
        echo "🔗 الروابط:"
        echo "   https://build-production-09b2.up.railway.app/admin/team"
        echo "   https://build-production-09b2.up.railway.app/over-ons"
    else
        echo "⚠️  فشل الدفع"
        echo ""
        echo "💡 جرب:"
        echo "   git pull origin main --rebase"
        echo "   git push origin main"
    fi
else
    echo "⚠️  Remote Origin: غير موجود"
    echo ""
    echo "📝 لإضافة remote وإكمال الدفع:"
    echo ""
    echo "1. إذا كان لديك repository على GitHub:"
    echo "   git remote add origin https://github.com/USERNAME/REPO.git"
    echo "   git push -u origin main"
    echo ""
    echo "2. إذا لم يكن لديك repository:"
    echo "   - أنشئ repository على: https://github.com/new"
    echo "   - انسخ رابط الـ repository"
    echo "   - شغّل: git remote add origin <الرابط>"
    echo "   - شغّل: git push -u origin main"
fi

echo ""
echo "================================================"
echo "   📋 ملخص الملفات"
echo "================================================"
echo ""

# Count files
TOTAL=$(git ls-files 2>/dev/null | wc -l | xargs)
CHANGED=$(git diff --cached --name-only 2>/dev/null | wc -l | xargs)

echo "📁 إجمالي الملفات في Git: $TOTAL"
if [ "$CHANGED" -gt "0" ]; then
    echo "📝 ملفات معدلة غير محفوظة: $CHANGED"
fi

echo ""
echo "✅ الملفات المهمة:"
[ -f .env ] && echo "   • .env ✓"
[ -f client/src/pages/admin/TeamMembers.tsx ] && echo "   • TeamMembers.tsx ✓"
[ -f dist/index.js ] && echo "   • dist/index.js ✓"
[ -f deploy.sh ] && echo "   • deploy.sh ✓"

echo ""
echo "================================================"
echo "   🎯 الخطوة التالية"
echo "================================================"
echo ""

if [ -n "$REMOTE" ]; then
    echo "✅ كل شيء جاهز!"
    echo "   Railway سينشر تلقائياً بعد الـ push"
else
    echo "📝 أضف remote ثم ادفع:"
    echo "   git remote add origin <REPO_URL>"
    echo "   git push -u origin main"
fi

echo ""
echo "📖 للمزيد من التفاصيل:"
echo "   cat FINAL_INSTRUCTIONS.md"
echo ""

