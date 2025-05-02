import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
    css: ['vuetify/styles'],

    devtools: {
        enabled: false,
    },

    build: {
        transpile: ['vuetify'],
    },

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

    app: {
        head: {
            title: '피니쉬 스크린 골프',
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/app_icon_playstore.png',
                }, // 브라우저 탭 아이콘
                {
                    rel: 'apple-touch-icon',
                    href: '/app_icon_playstore.png',
                }, // 홈화면 추가용 아이콘
            ],
            meta: [
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, viewport-fit=cover',
                },
                {
                    name: 'mobile-web-app-capable',
                    content: 'yes',
                },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent',
                },
                {
                    name: 'apple-mobile-web-app-title',
                    content: '피니쉬 스크린 골프',
                },
                {
                    name: 'theme-color',
                    content: '#008080',
                },
            ],
        },
    },

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('.', import.meta.url)),
            },
        },
    },

    compatibilityDate: '2024-12-25',
});
