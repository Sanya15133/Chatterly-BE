module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
