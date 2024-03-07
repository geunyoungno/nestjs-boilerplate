/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';


const config: Config = {
  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
  ],

  // modulePaths: [compilerOptions.baseUrl],

  // @see https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } ),

  // The root directory that Jest should scan for tests and modules within
  // rootDir: "src",


  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [],


  // The test environment that will be used for testing
  "testEnvironment": "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__test__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/", "example/", "dist/"
  ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // "testRegex": ".*\\.spec\\.ts$",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },

  // Indicates whether each individual test should be reported during the run
  verbose: false,

  silent: false,
};

export default config;
