import React, { useEffect } from 'react';

export default function SEO({ title, description, image, url, schema }) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = `${title} | NovaStore Flagship`;
    }

    // 2. Helper to update or create meta tags dynamically
    const updateMetaTag = (attributeName, value, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${attributeName}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attributeName);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    if (description) {
      updateMetaTag('description', description, false);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description, true);
    }

    if (title) {
      updateMetaTag('og:title', `${title} | NovaStore Flagship`, true);
      updateMetaTag('twitter:title', `${title} | NovaStore Flagship`, true);
    }

    if (image) {
      updateMetaTag('og:image', image, true);
      updateMetaTag('twitter:image', image, true);
    }

    if (url) {
      updateMetaTag('og:url', url, true);
    }

    // Twitter Card type
    updateMetaTag('twitter:card', 'summary_large_image', false);

    // 3. Inject JSON-LD Product Schema for Google Shopping / SEO
    let schemaScript = document.querySelector('#json-ld-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'json-ld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.text = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, image, url, schema]);

  return null; // yeh component visual UI render nahi karta, sirf head manage karta hai
}