import { createContext, useContext, ReactNode } from 'react';
import { trpc } from '@/lib/trpc';

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteLogo: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  footerCopyright: string;
  footerDescription: string;
  googleAnalytics: string;
  facebookPixel: string;
  customTrackingCode: string;
  showHero: boolean;
  showServices: boolean;
  showProjects: boolean;
  showTestimonials: boolean;
  showPartners: boolean;
  showContact: boolean;
}

const defaultSettings: SiteSettings = {
  siteTitle: "BuildCraft - Professional Construction Services",
  siteDescription: "Professionele bouw- en onderhoudsdiensten voor al uw projecten",
  siteLogo: "/logo.svg",
  primaryColor: "#f59e0b",
  secondaryColor: "#1e40af",
  contactEmail: "info@buildcraft.nl",
  contactPhone: "+31 20 123 4567",
  contactAddress: "Bouwstraat 123, 1234 AB Amsterdam, Nederland",
  facebookUrl: "https://facebook.com/buildcraft",
  linkedinUrl: "https://linkedin.com/company/buildcraft",
  instagramUrl: "https://instagram.com/buildcraft",
  twitterUrl: "https://twitter.com/buildcraft",
  metaTitle: "BuildCraft - Professional Construction Services",
  metaDescription: "Professionele bouw- en onderhoudsdiensten voor al uw projecten. Van nieuwbouw tot renovatie, wij maken het mogelijk.",
  metaKeywords: "bouw, constructie, nieuwbouw, renovatie, onderhoud, BuildCraft",
  footerCopyright: "© 2024 BuildCraft. Alle rechten voorbehouden.",
  footerDescription: "BuildCraft is uw betrouwbare partner voor professionele bouw- en onderhoudsdiensten.",
  googleAnalytics: "",
  facebookPixel: "",
  customTrackingCode: "",
  showHero: true,
  showServices: true,
  showProjects: true,
  showTestimonials: true,
  showPartners: true,
  showContact: true,
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: false,
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const { data: allSettings, isLoading } = trpc.siteSettings.getAll.useQuery();

  // Parse settings from database
  const settings: SiteSettings = { ...defaultSettings };
  
  if (allSettings && allSettings.length > 0) {
    allSettings.forEach((setting) => {
      let value: any = setting.value;
      // Parse boolean and number types
      if (setting.type === 'boolean') {
        value = value === 'true' || value === '1';
      } else if (setting.type === 'number') {
        value = parseFloat(value);
      }
      (settings as any)[setting.key] = value;
    });
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, loading: isLoading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return context;
}
