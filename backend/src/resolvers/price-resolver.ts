import { Price } from "../entities/price-entity";
import {
  Arg,
  Field,
  FieldResolver,
  Float,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Item } from "../entities/item-entity";
import { Project } from "../entities/project-entity";

@ObjectType()
class QueryItemsResult {
  @Field(() => Float)
  unitPrice!: number;
  @Field()
  contractor!: string;
  @Field(() => Date)
  bidDate!: Date;
}

// Define queries and updates for item_prices table
@Resolver(Price)
export class PriceResolver {
  
  @Query(() => [QueryItemsResult])
  async queryItems(
    @Arg("itemCode", () => Int) itemCode: number,
    @Arg("startDate") startDate: Date,
    @Arg("endDate") endDate: Date
  ) {
    const result = await Price.createQueryBuilder("price")
      .innerJoinAndSelect("price.project", "project")
      .select(["price.unit_price", "price.contractor", "project.bid_date"])
      .where(
        "price.item_code = :itemCode and project.bid_date > :startDate and project.bid_date < :endDate",
        { itemCode, startDate, endDate }
      )
      .getMany();
    const structuredResult: QueryItemsResult[] = [];
    result.forEach((item) => {
      structuredResult.push({
        unitPrice: item.unit_price,
        contractor: item.contractor,
        bidDate: (item.project as any).bid_date,
      });
    });
    return structuredResult;
  }

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
