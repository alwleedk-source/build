import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const siteTitle = 'BuildCraft - Professional Construction Services';
  const siteDescription = currentLang === 'nl' 
    ? 'Professionele bouw- en renovatiediensten in Nederland. Specialist in residentiële, commerciële en industriële projecten.'
    : 'Professional construction and renovation services in the Netherlands. Specialist in residential, commercial and industrial projects.';
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || siteDescription;
  const fullUrl = url || window.location.href;
  const fullImage = image || '/logo.png';

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', fullDescription);
    updateMetaTag('language', currentLang);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', currentLang === 'nl' ? 'nl_NL' : 'en_US', true);
    updateMetaTag('og:site_name', siteTitle, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', fullImage);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      if (author) {
        updateMetaTag('article:author', author, true);
      }
    }

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'Organization',
      name: siteTitle,
      description: fullDescription,
      url: fullUrl,
      logo: fullImage,
      ...(type === 'article' && {
        headline: title,
        datePublished: publishedTime,
        dateModified: modifiedTime,
        author: {
          '@type': 'Organization',
          name: author || siteTitle,
        },
      }),
    };

    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

  }, [fullTitle, fullDescription, fullImage, fullUrl, type, publishedTime, modifiedTime, author, currentLang]);

  return null;
}
