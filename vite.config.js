const getPublicPath = require('./getPublicPath');
const getBaseName = require('./src/Assets/js/getBaseName');
const setNodeEnvValue = require('./setNodeEnvValue');
const path = require('node:path');
const command = require('./src/Assets/js/command');
const react = require('@vitejs/plugin-react');
const rootPath = process.cwd();
import { createHtmlPlugin } from 'vite-plugin-html';

/** @type {import('vite').UserConfig} */
export default {
    // 配置选项
    base: command.isDev ? '/' : getPublicPath(),
    define: {
        'process.env.NODE_ENV': JSON.stringify(setNodeEnvValue()),
        'process.env.BASENAME': JSON.stringify(getBaseName()),
    },
    plugins: [
        react({
            targets: 'cover 99%',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'entry',
                        forceAllTransforms: true,
                        corejs: '3.25.5',
                    },
                ],
            ],
            plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-transform-react-constant-elements',
            ],
        }),

        createHtmlPlugin({
            minify: true,
            entry: path.resolve(__dirname, ''),
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    resolve: {
        alias: {
            '~': path.join(rootPath, '/src'),
        },
        extensions: ['.tsx', '.jsx', '.ts', '.js', '.json', '.d.ts'],
    },
    css: {
        modules: {},
        postcss: {},
    },
    esbuild: {
        tsconfigRaw: {
            compilerOptions: {
                jsx: 'react-jsx',
                target: 'ES2015',
            },
        },
    },
    server: { host: '0.0.0.0', port: 8080, strictPort: false, https: false, open: true },
    preview: {
        host: '0.0.0.0',
        port: 8080,
    },
    optimizeDeps: {
        exclude: ['node_modules'],
        include: ['@datareachable', '@possie-engine'],
    },
    build: {
        outDir: path.join(rootPath, '/build'),
        rollupOptions: {
            input: {
                main: path.join(rootPath, '/public/index.html'),
            },
        },
    },
};
