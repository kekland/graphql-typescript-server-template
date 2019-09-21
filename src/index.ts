import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from './recipes/recipe';
import Logger from './logger/logger';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const schema = await buildSchema({
    // IMPORTANT: Add resolvers here
    resolvers: [RecipeResolver],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const serverInfo = await server.listen(PORT);
  Logger.info(`Server is running at port ${serverInfo.port}. GraphQL Playground available at ${serverInfo.url}`)
}

bootstrap()