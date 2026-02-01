/*
 * @Author: liuxiang
 * @Date: 2026-02-02 00:30:35
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 02:05:01
 * @Description: file content
 */
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@td-design|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-vector-icons|@shopify)/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/node_modules/react-native/jest/setup.js',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
};