import { createResolver } from '@nuxt/kit';
import process from 'node:process';

const { resolve } = createResolver(import.meta.url);

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_API_KEY,
      indexName: 'eslint-vinicunca',
    },

    // DocSearch key is used to configure DocSearch extension.
    docSearch: {
      indexName: 'eslint-vinicunca',
    },
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },

  components: [
    {
      global: true,
      path: '~~/domains/docs/components',
      pathPrefix: false,
    },
  ],

  content: {
    documentDriven: {
      injectPage: false,
    },

    highlight: {
      theme: 'one-dark-pro',
    },

    markdown: {
      anchorLinks: false,

      toc: {
        depth: 2,
      },
    },

    navigation: {
      fields: ['icon'],
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~~/designs/styles/index.css',
    '~~/designs/styles/docs.css',
  ],

  devServer: {
    port: 3001,
  },

  gtag: {
    id: isDev ? undefined : 'G-38W7J3MEER',
  },

  modules: [
    '@nuxtjs/algolia',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@unocss/nuxt',
    'nuxt-gtag',
    resolve('./app/content-post-process'),
  ],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  routeRules: {
    '/configs': {
      redirect: {
        statusCode: 302,
        to: '/configs/ignores',
      },
    },
    '/plugin-vinicunca': {
      redirect: {
        statusCode: 302,
        to: '/plugin-vinicunca/cognitive-complexity',
      },
    },
    '/user-guide': {
      redirect: {
        statusCode: 302,
        to: '/user-guide/installation',
      },
    },
  },
});
