
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'restaurant' | 'profile';
  ogImage?: string;
  structuredData?: Record<string, any>;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://thineewangsammo.com/images/og-image.png',
  structuredData,
}: SEOProps) => {
  const siteTitle = "ที่นี่วังสามหมอ";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || "บริการส่งอาหารจากร้านอาหารท้องถิ่นในวังสามหมอ จัดส่งรวดเร็ว อาหารร้อน อร่อย";
  const currentUrl = canonicalUrl || "https://thineewangsammo.com/";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
