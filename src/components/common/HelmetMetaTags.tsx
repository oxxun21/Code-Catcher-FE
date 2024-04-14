import { Helmet } from "react-helmet-async";
import { MetaData_I } from "../../interface";

interface HelmetMetaTagsProps {
  meta: MetaData_I;
}

export const HelmetRootMetaTags = ({ meta }: HelmetMetaTagsProps) => {
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index,follow" />
    </Helmet>
  );
};

export const HelmetMetaTags = ({ meta }: HelmetMetaTagsProps) => {
  console.log(meta.image);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      <meta name="robots" content="index,follow" />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="코디(Codee)" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  );
};
