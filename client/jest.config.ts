// /**
//  jest.config.ts
//  */
// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   preset: 'ts-jest', // Use ts-jest for TypeScript
//   testEnvironment: 'jsdom', // Use jsdom for browser-like environment
//    "setupFilesAfterEnv": ["<rootDir>/src/jest.setup.ts"],
//   moduleNameMapper: {
//     // Handle module aliases (if you use them in your project)
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   transform: {
//     // Transform TypeScript files with ts-jest
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   testMatch: [
//     // Match test files
//     '<rootDir>/src/**/*.test.ts',
//     '<rootDir>/src/**/*.test.tsx',
//   ],
//   collectCoverage: true, // Enable coverage reporting
//   collectCoverageFrom: [
//     // Specify files to include in coverage
//     'src/**/*.{ts,tsx}',
//     '!src/**/*.d.ts',
//     '!src/**/*.stories.tsx', // Exclude Storybook files
//     '!src/**/index.ts', // Exclude index files
//   ],
//   coverageReporters: ['text', 'lcov'], // Generate coverage reports
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.json', // Reference the main tsconfig.json
//     },
//   },
// };

// export default config;


//  jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'], // Setup files after the environment is loaded
  moduleNameMapper: {
    // Handle module aliases (if you use them in your project)
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1', // Add this for component aliases
    '^@features/(.*)$': '<rootDir>/src/features/$1', // Add this for feature aliases
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    // Transform TypeScript and JavaScript files with ts-jest
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json', // Reference the main tsconfig.json
      },
    ],
  },
  testMatch: [
    // Match test files
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx',
  ],
  collectCoverage: true, // Enable coverage reporting
  collectCoverageFrom: [
    // Specify files to include in coverage
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/**/*.stories.tsx', // Exclude Storybook files
    '!src/**/index.ts', // Exclude index files
  ],
  coverageReporters: ['text', 'lcov'], // Generate coverage reports
};

export default config;