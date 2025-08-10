// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vite-pwa/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxt/image'
  ],

  image: {
    domains: ['avatars.githubusercontent.com']
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800, 900]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },

  css: ['~/assets/css/main.css'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'MDIX',
      short_name: 'MDIX',
      description: 'Conversor minimalista de Bitcoin para Real',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon'
        }
      ]
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})