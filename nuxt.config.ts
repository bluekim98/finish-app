import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },
    css: ['vuetify/styles'],
    modules: [
        '@nuxt/eslint',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
    ],
    runtimeConfig: {
        auth: {
            name: 's',
            password: process.env.NUXT_AUTH_PASSWORD,
        },
        public: {
            apiBase: 'http://localhost:3000',
        },
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },

    compatibilityDate: '2024-12-25',
});
