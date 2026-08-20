import site from "../config/site.js";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export const absoluteUrl = (path: string) =>
  new URL(path.replace(/^\/+/, ""), `${site.canonicalOrigin}/`).toString();

export const organizationSchema = () => {
  const contactPoint: Record<string, string> = {};
  if (site.contact.phone) contactPoint.telephone = site.contact.phone;
  if (site.contact.email) contactPoint.email = site.contact.email;
  const sameAs = [site.social.facebook, site.social.instagram].filter(Boolean);

  return {
    "@type": "Organization",
    "@id": `${site.canonicalOrigin}/#organization`,
    name: site.name,
    ...(site.company.legalName ? { legalName: site.company.legalName } : {}),
    ...(site.company.address ? { address: site.company.address } : {}),
    url: `${site.canonicalOrigin}/th/`,
    description: site.company.description,
    ...(Object.keys(contactPoint).length > 0
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            ...contactPoint,
            contactType: "customer service",
            availableLanguage: "Thai",
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    brand: [
      {
        "@type": "Brand",
        name: "Super Ice",
        url: `${site.canonicalOrigin}/th/super-ice/`,
      },
      {
        "@type": "Brand",
        name: "ICEBERG",
        url: `${site.canonicalOrigin}/th/iceberg/`,
      },
    ],
  };
};

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${site.canonicalOrigin}/#website`,
  url: `${site.canonicalOrigin}/th/`,
  name: site.name,
  inLanguage: "th-TH",
  publisher: { "@id": `${site.canonicalOrigin}/#organization` },
});

export const webPageSchema = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  "@type": "WebPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name: title,
  description,
  inLanguage: "th-TH",
  isPartOf: { "@id": `${site.canonicalOrigin}/#website` },
  about: { "@id": `${site.canonicalOrigin}/#organization` },
});

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.href),
  })),
});

export const brandSchema = ({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) => ({
  "@type": "Brand",
  "@id": `${absoluteUrl(path)}#brand`,
  name,
  description,
  url: absoluteUrl(path),
});

export const productSchema = ({
  name,
  description,
  brand,
  path,
}: {
  name: string;
  description: string;
  brand: string;
  path: string;
}) => ({
  "@type": "Product",
  "@id": `${absoluteUrl(path)}#product`,
  name,
  description,
  url: absoluteUrl(path),
  brand: {
    "@type": "Brand",
    name: brand,
  },
});

export const jsonLdGraph = (...items: Record<string, unknown>[]) => ({
  "@context": "https://schema.org",
  "@graph": items,
});
