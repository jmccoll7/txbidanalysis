import { ObjectType, Field, Resolver, Query, Ctx, Arg } from "type-graphql";
import { AppContext } from "../app-context";
import { Item } from "../entities/item-entity";
import { Like } from "typeorm"

@Resolver(Item)
export class ItemResolver {
  @Query(() => [Item])
  items(
    @Arg("searchInput") searchInput: string
  ) {
    return Item.findBy({
      item_description: Like(`%${searchInput}%`)
    })
  }
}
