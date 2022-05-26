const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: ['json-summary', 'text'],
  roots: [
    '<rootDir>/pages',
    '<rootDir>/components',
    '<rootDir>/providers',
    '<rootDir>/lib',
    '<rootDir>/interfaces',
    '<rootDir>/hooks',
  ],
  collectCoverageFrom: ['<rootDir>/**'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

module.exports = createJestConfig(customJestConfig)
