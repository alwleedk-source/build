import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: 'nl_NL' | 'en_US';
}

export default function SEO({
  title = 'BuildCraft - Professional Construction Services',
  description = 'BuildCraft biedt professionele bouwdiensten in Nederland. Specialist in residentieel, commercieel en industrieel bouwen.',
  keywords = 'bouwbedrijf, constructie, renovatie, aannemer, Nederland, bouw, BuildCraft',
  image = 'https://build-production-09b2.up.railway.app/og-image.jpg',
  url = 'https://build-production-09b2.up.railway.app',
  type = 'website',
  locale = 'nl_NL',
}: SEOProps) {
  const fullTitle = title.includes('BuildCraft') ? title : `${title} | BuildCraft`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="BuildCraft" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Dutch" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="BuildCraft" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="nl" href={url} />
      <link rel="alternate" hrefLang="en" href={url.replace('https://build-production-09b2.up.railway.app', 'https://build-production-09b2.up.railway.app/en')} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
}

