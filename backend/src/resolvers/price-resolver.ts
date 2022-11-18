import { Price } from "../entities/price-entity";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Item } from "../entities/item-entity";
import { Project } from "../entities/project-entity";

// Define queries and updates for item_prices table
@Resolver(Price)
export class PriceResolver {
  @FieldResolver(() => Item)
  async item(@Root() price: Price): Promise<Item | null> {
    return Item.findOne({
      where: {
        item_code: price.item_code,
      },
    });
  }

  @FieldResolver(() => Project)
  async project(@Root() price: Price): Promise<Project | null> {
    return Project.findOne({
      where: {
        project: price.project,
      },
    });
  }

  // Return all item_prices rows
  @Query(() => [Price])
  get_item_prices(): Promise<Price[]> {
    return Price.find();
  }

  // Return all item_prices rows for a specific item_code
  @Query(() => [Price])
  get_prices_by_item(@Arg("item_code") item_code: number): Promise<Price[]> {
    return Price.findBy({ item_code });
  }
}
