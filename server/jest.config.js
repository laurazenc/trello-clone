const ignoredPaths = ["<rootDir>/node_modules/", "<rootDir>/dist"];

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ignoredPaths,
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  forceExit: true,
  setupTestFrameworkScriptFile: "./src/utils/tests/test-environment"
};
