import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: string; // JSON-LD string
}

/**
 * Component to inject JSON-LD structured data into page
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {data}
      </script>
    </Helmet>
  );
}

