import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          id: '/',
          name: 'STAT-Psych India — Emergency Psychiatric CDSS',
          short_name: 'STAT-Psych',
          description: 'Evidence-first psychiatric emergency clinical decision support system for casualty and crisis care, based on IPS CPG, CMC Vellore trials, and MHCA 2017.',
          theme_color: '#0a0f1d',
          background_color: '#060913',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          categories: ['medical', 'health', 'productivity'],
          shortcuts: [
            {
              name: 'Acute Agitation',
              short_name: 'Agitation',
              description: 'Launch Acute Severe Agitation Protocol',
              url: '/?pathway=agitation',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'Catatonia & Challenge',
              short_name: 'Catatonia',
              description: 'Lorazepam Challenge & BFCRS Evaluator',
              url: '/?pathway=catatonia',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'NMS Protocol',
              short_name: 'NMS',
              description: 'Neuroleptic Malignant Syndrome Criteria',
              url: '/?pathway=nms',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'Alcohol DT & Wernicke',
              short_name: 'Alcohol DT',
              description: 'Delirium Tremens & High-Dose Thiamine',
              url: '/?pathway=alcohol_dt',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallbackDenylist: [/\.apk$/i, /^\/stat-psych-india\.apk$/i],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
