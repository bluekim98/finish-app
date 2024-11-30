const vuePlugin = require('eslint-plugin-vue');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const vueParser = require('vue-eslint-parser');

module.exports = [
    {
        // 무시할 파일 및 디렉토리
        ignores: [
            'node_modules/**', // Node.js 의존성
            'dist/**', // 빌드 결과물
            '.output/**', // Nuxt 빌드 디렉토리
            'nuxt.config.ts', // Nuxt 설정 파일
            'modules/**', // Nuxt 모듈 디렉토리
            'settings/**', // 설정 파일 디렉토리
            'static/**', // 정적 파일 디렉토리
            '.nuxt/**', // Nuxt의 내부 디렉토리
        ],
    },
    {
        // Vue 및 일반 파일 설정
        files: ['**/*.vue', '**/*.js', '**/*.ts'], // 대상 파일 확장자
        languageOptions: {
            parser: vueParser, // Vue 파일 파서 설정
            parserOptions: {
                parser: '@typescript-eslint/parser', // <script> 섹션에 TypeScript 파서 사용
                ecmaVersion: 'latest', // 최신 ECMAScript 지원
                sourceType: 'module', // ES Module 사용
            },
        },
        plugins: {
            vue: vuePlugin,
            '@typescript-eslint': typescriptPlugin,
        },
        processor: vuePlugin.processors['.vue'], // Vue 파일의 섹션별 처리
        rules: {
            // Vue-specific rules
            ...vuePlugin.configs.recommended.rules, // Vue 권장 규칙 적용
            'vue/multi-word-component-names': 'off', // 단일 단어 컴포넌트 이름 허용
            'vue/no-v-html': 'off', // v-html 허용
            'vue/require-default-prop': 'off', // 기본 prop 필요하지 않음
            'vue/script-setup-uses-vars': 'error', // script setup에서 정의된 변수를 인식

            // TypeScript rules
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // General rules
            'no-console': 'warn',
            'no-debugger': 'warn',
        },
    },
];
