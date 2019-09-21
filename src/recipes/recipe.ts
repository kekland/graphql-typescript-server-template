import { ObjectType, ID, Field } from 'type-graphql';
import { Query, Resolver, ArgsType, Int, Args } from 'type-graphql';
import { Min, Max } from 'class-validator';


@ObjectType()
export class Recipe {
  @Field(type => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate!: Date;

  @Field(type => [String])
  ingredients!: string[];
}

@ArgsType()
class GetRecipesArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 20;

  @Field({ nullable: true })
  title?: string;

  // helpers - index calculations
  startIndex = this.skip;
  endIndex = this.skip + this.take;
}

@Resolver()
export class RecipeResolver {
  private recipesCollection: Recipe[] = [];

  @Query(returns => [Recipe])
  async recipes(@Args() { title, startIndex, endIndex }: GetRecipesArgs) {
    // sample implementation
    let recipes = this.recipesCollection;
    if (title) {
      recipes = recipes.filter(recipe => recipe.title === title);
    }
    return recipes.slice(startIndex, endIndex);
  }
}
