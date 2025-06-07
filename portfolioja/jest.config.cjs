/* eslint-disable */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const rawPaths = compilerOptions.paths ?? {};

const filteredPaths = Object.fromEntries(
  Object.entries(rawPaths).filter(
    ([, value]) => Array.isArray(value) && value.every(Boolean)
  )
);

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(filteredPaths),
  transform: {
    ".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$":
      "jest-transform-stub",
  },
};