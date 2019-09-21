import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from './recipes/recipe';
declare const module: any;

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  // Add resolvers here
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop())
  }
}

bootstrap()