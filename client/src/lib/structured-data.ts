/**
 * Schema.org Structured Data Helpers
 * Generate JSON-LD markup for better SEO
 */

export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    email: string;
    contactType: string;
  };
  sameAs?: string[]; // Social media URLs
}

export interface Service {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  url: string;
  image?: string;
}

export interface Article {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: Organization;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(org: Organization): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ConstructionCompany",
    "name": org.name,
    "url": org.url,
    "logo": org.logo,
    "description": org.description,
    ...(org.address && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": org.address.streetAddress,
        "addressLocality": org.address.addressLocality,
        "postalCode": org.address.postalCode,
        "addressCountry": org.address.addressCountry,
      }
    }),
    ...(org.contactPoint && {
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": org.contactPoint.telephone,
        "email": org.contactPoint.email,
        "contactType": org.contactPoint.contactType,
      }
    }),
    ...(org.sameAs && { "sameAs": org.sameAs }),
  };

  return JSON.stringify(schema);
}

/**
 * Generate Service Schema
 */
export function generateServiceSchema(service: Service): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
    },
    "areaServed": {
      "@type": "Place",
      "name": service.areaServed,
    },
    "url": service.url,
    ...(service.image && { "image": service.image }),
  };

  return JSON.stringify(schema);
}

/**
 * Generate Article/BlogPosting Schema
 */
export function generateArticleSchema(article: Article): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      ...(article.author.url && { "url": article.author.url }),
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": article.publisher.logo,
      }
    },
    "url": article.url,
  };

  return JSON.stringify(schema);
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Generate AggregateRating Schema
 */
export function generateRatingSchema(rating: AggregateRating, itemName: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": itemName,
    },
    "ratingValue": rating.ratingValue,
    "reviewCount": rating.reviewCount,
    "bestRating": rating.bestRating || 5,
    "worstRating": rating.worstRating || 1,
  };

  return JSON.stringify(schema);
}

/**
 * Generate WebSite Schema with SearchAction
 */
export function generateWebsiteSchema(url: string, name: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return JSON.stringify(schema);
}

