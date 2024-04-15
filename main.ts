import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

import { AppDataSource } from "./src/db/data-source";
import { CountryResolver } from "./src/resolvers/CountryResolver";

async function startServer() {
  await AppDataSource.initialize().catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
