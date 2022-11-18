import { ObjectType, Field, Resolver, Query } from "type-graphql";
import { Item } from "../entities/item-entity";

@ObjectType()
class PaginatedItems {
  @Field(() => [Item])
  items!: Item[];
  @Field()
  hasMore!: boolean;
}

@Resolver(Item)
export class ItemResolver {
  @Query(() => [Item])
  items() {
    return Item.find();
  }
}
