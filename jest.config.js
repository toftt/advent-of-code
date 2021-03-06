/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~utils(.*)$": "<rootDir>/src/utils/$1",
  },
  extraGlobals: ["Math"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
