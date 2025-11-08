import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'nl' ? 'en' : 'nl';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'NL';
  const nextLang = i18n.language === 'en' ? 'NL' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-accent transition-colors group"
      aria-label={`Switch to ${nextLang}`}
      title={`Switch to ${nextLang}`}
    >
      <Globe className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="font-semibold text-sm">{currentLang}</span>
      <span className="text-muted-foreground text-xs">→</span>
      <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">{nextLang}</span>
    </button>
  );
}
