const { GraphQLServer } = require("graphql-yoga");
const { genSchema } = require("./schemas");

const schema = genSchema();

const server = new GraphQLServer({ schema });
server.start(() => console.log("Server is running on localhost:4000"));
