import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/site-data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.brandName,
    short_name: 'JM Advocacia',
    description:
      'Advocacia especializada em Passo de Torres, SC (OAB/SC 75.973) e obras publicadas de Jeferson Gonçalves Martins.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0B0E',
    theme_color: '#C8A25A',
    lang: 'pt-BR',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  };
}
