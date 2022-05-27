import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: ['json-summary', 'text'],
  roots: [
    '<rootDir>/pages/',
    '<rootDir>/hooks/',
    '<rootDir>/components/',
    '<rootDir>/lib/',
    '<rootDir>/providers/',
    '<rootDir>/interfaces/',
  ],
  collectCoverageFrom: ['<rootDir>/**'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
}

module.exports = createJestConfig(customJestConfig)
