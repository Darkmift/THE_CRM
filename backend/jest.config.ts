/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from '@jest/types';
import { resolve } from 'path';
const path = resolve(__dirname, '.env.development.local');
console.log('🚀 ~ file: jest.config.ts:5 ~ path:', path);

// Sync object
const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
        // Set the environment variable for the dotenv path
        DOTENV_CONFIG_PATH: resolve(__dirname, '.env.development.local'),
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: [
        'node_modules',
        'src/config',
        'src/app.js',
        'tests',
    ],
    roots: [resolve(__dirname)],
    // // transform: {
    // //     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // // },
    globals: {
        'ts-jest': {
            tsconfig: {
                baseUrl: './src',
                paths: {
                    '@/*': ['./*'],
                },
            },
        },
    },
    // setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: [resolve(__dirname, '__test__', 'setup.test.ts')],
    setupFiles: [resolve(__dirname, '__test__', 'setup.test.ts')],

    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    // coverageReporters: ['text', 'lcov', 'clover', 'html'],
    // modulePaths: [`<rootDir>`],
    // moduleDirectories: ['node_modules', `<rootDir>/src`],
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default config;
