import { ObjectType, ID, Field, Mutation, InputType } from 'type-graphql';
import { Query, Resolver, ArgsType, Int, Args, Arg } from 'type-graphql';
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

@InputType()
class NewRecipeInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

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
  async getRecipes(@Args() { title, startIndex, endIndex }: GetRecipesArgs) {
    // sample implementation
    let recipes = this.recipesCollection;
    if (title) {
      recipes = recipes.filter(recipe => recipe.title === title);
    }
    return recipes.slice(startIndex, endIndex);
  }

  @Mutation(returns => Recipe)
  async addRecipe(@Arg("newRecipe") newRecipe: NewRecipeInput) {
    const { title, description, ingredients } = newRecipe;
    const recipe ={
      id: Math.random().toFixed(3),
      title,
      description,
      creationDate: new Date(),
      ingredients
    };
    this.recipesCollection.push(recipe);
    return recipe;
  }

  @Mutation(returns => Boolean)
  async deleteRecipe(@Arg("recipeID") recipeID: string) {
    let recipes = this.recipesCollection;

    const filtered = recipes.filter(recipe => recipe.id !== recipeID);
    if (filtered.length === recipes.length - 1) {
      this.recipesCollection = [...filtered];
      return true;
    }
    return false;
  }
}