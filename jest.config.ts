export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/test/**',
    '!**/domain/**',
    '!**/*-contracts/**',
    '!**/contract/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: [
    '<rootDir>/src'
  ],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
