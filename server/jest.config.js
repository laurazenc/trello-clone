const ignoredPaths = ["<rootDir>/node_modules/", "<rootDir>/dist"];

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testPathIgnorePatterns: ignoredPaths,
  coverageDirectory: "coverage",
  forceExit: true
  //   testEnvironment: "./src/utils/test/test-environment"
};
