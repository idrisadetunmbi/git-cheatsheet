module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  rootDir: 'src/client',
  setupFiles: ['jest-localstorage-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
