import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Configura Jest para usar ts-jest
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};

export default config;
