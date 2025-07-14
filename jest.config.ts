import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "jest-transform-stub",
  },
  // 👇 Transform ESM packages manually
  transformIgnorePatterns: [
    "/node_modules/(?!d3.*|@deck\\.gl|deck\\.gl|@mapbox/tiny-sdf)",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transform-stub",
    "^react-map-gl/maplibre$": "<rootDir>/__mocks__/react-map-gl-maplibre.js",
    "@mapbox/tiny-sdf": "<rootDir>/__mocks__/@mapbox/tiny-sdf.js",
  },
};

export default config;
