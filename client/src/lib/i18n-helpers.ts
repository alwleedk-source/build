import { useTranslation } from 'react-i18next';

/**
 * Get localized content from an object with NL and EN fields
 * @param item Object with content fields
 * @param field Field name (e.g., 'title', 'description')
 * @returns Localized content based on current language
 */
export function useLocalizedContent<T extends Record<string, any>>(
  item: T,
  field: keyof T
): string {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // If English is selected and English field exists, use it
  if (currentLang === 'en') {
    const enField = `${String(field)}En` as keyof T;
    if (item[enField]) {
      return String(item[enField]);
    }
  }
  
  // Fallback to Dutch (default)
  return String(item[field] || '');
}

/**
 * Hook to get a function that returns localized content
 */
export function useGetLocalizedContent() {
  const { i18n } = useTranslation();
  
  return function getLocalizedContent<T extends Record<string, any>>(
    item: T,
    field: keyof T
  ): string {
    const currentLang = i18n.language;
    
    // If English is selected and English field exists, use it
    if (currentLang === 'en') {
      const enField = `${String(field)}En` as keyof T;
      if (item[enField]) {
        return String(item[enField]);
      }
    }
    
    // Fallback to Dutch (default)
    return String(item[field] || '');
  };
}

/**
 * Get localized content without hooks (for use in components)
 */
export function getLocalizedContent<T extends Record<string, any>>(
  item: T,
  field: keyof T,
  language: string
): string {
  // If English is selected and English field exists, use it
  if (language === 'en') {
    const enField = `${String(field)}En` as keyof T;
    if (item[enField]) {
      return String(item[enField]);
    }
  }
  
  // Fallback to Dutch (default)
  return String(item[field] || '');
}

/**
 * Get localized features array (parsed from JSON)
 */
export function useLocalizedFeatures(item: { features: string; featuresEn?: string }): string[] {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  try {
    if (currentLang === 'en' && item.featuresEn) {
      return JSON.parse(item.featuresEn);
    }
    return JSON.parse(item.features);
  } catch {
    return [];
  }
}
