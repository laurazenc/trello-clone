const { mergeTypes, mergeResolvers } = require("merge-graphql-schemas");
const path = require("path");
const fs = require("fs");
const { makeExecutableSchema } = require("graphql-tools");
const glob = require("glob");

export const genSchema = () => {
  const pathToModules = path.join(__dirname, "./modules");
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/**/resolver.*`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
