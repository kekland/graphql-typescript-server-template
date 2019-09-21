import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from './recipes/recipe';

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

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap()