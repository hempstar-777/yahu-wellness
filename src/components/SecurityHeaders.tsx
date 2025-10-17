import { useEffect } from 'react';

/**
 * SecurityHeaders component sets essential security meta tags
 * Protects against XSS, clickjacking, and other common web attacks
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Add security-related meta tags
    const metaTags = [
      // Content Security Policy - prevents XSS attacks
      {
        httpEquiv: 'Content-Security-Policy',
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://ai.gateway.lovable.dev;"
      },
      // Prevent clickjacking
      {
        httpEquiv: 'X-Frame-Options',
        content: 'SAMEORIGIN'
      },
      // XSS Protection
      {
        httpEquiv: 'X-XSS-Protection',
        content: '1; mode=block'
      },
      // Prevent MIME type sniffing
      {
        httpEquiv: 'X-Content-Type-Options',
        content: 'nosniff'
      },
      // Referrer Policy
      {
        name: 'referrer-policy',
        content: 'strict-origin-when-cross-origin'
      },
      // Permissions Policy
      {
        httpEquiv: 'Permissions-Policy',
        content: 'geolocation=(), microphone=(), camera=()'
      }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if ('httpEquiv' in tag) {
        meta.httpEquiv = tag.httpEquiv;
      } else if ('name' in tag) {
        meta.name = tag.name;
      }
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Cleanup function
    return () => {
      metaTags.forEach(() => {
        const metas = document.querySelectorAll('meta[http-equiv], meta[name="referrer-policy"]');
        metas.forEach(meta => meta.remove());
      });
    };
  }, []);

  return null;
};

export default SecurityHeaders;
