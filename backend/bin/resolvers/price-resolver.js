var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Price } from "../entities/price-entity";
import { Arg, Field, FieldResolver, Float, Int, ObjectType, Query, Resolver, Root, } from "type-graphql";
import { Item } from "../entities/item-entity";
import { Project } from "../entities/project-entity";
let QueryItemsResult = class QueryItemsResult {
};
__decorate([
    Field(() => Float),
    __metadata("design:type", Number)
], QueryItemsResult.prototype, "unitPrice", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], QueryItemsResult.prototype, "contractor", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], QueryItemsResult.prototype, "bidDate", void 0);
QueryItemsResult = __decorate([
    ObjectType()
], QueryItemsResult);
// Define queries and updates for item_prices table
let PriceResolver = class PriceResolver {
    async queryItems(itemCode, startDate, endDate) {
        const result = await Price.createQueryBuilder("price")
            .innerJoinAndSelect("price.project", "project")
            .select(["price.unit_price", "price.contractor", "project.bid_date"])
            .where("price.item_code = :itemCode and project.bid_date > :startDate and project.bid_date < :endDate", { itemCode, startDate, endDate })
            .getMany();
        const structuredResult = [];
        result.forEach((item) => {
            structuredResult.push({
                unitPrice: item.unit_price,
                contractor: item.contractor,
                bidDate: item.project.bid_date,
            });
        });
        return structuredResult;
    }
    async item(price) {
        return Item.findOne({
            where: {
                item_code: price.item_code,
            },
        });
    }
    async project(price) {
        return Project.findOne({
            where: {
                project: price.project,
            },
        });
    }
    // Return all item_prices rows
    get_item_prices() {
        return Price.find();
    }
    // Return all item_prices rows for a specific item_code
    get_prices_by_item(item_code) {
        return Price.findBy({ item_code });
    }
};
__decorate([
    Query(() => [QueryItemsResult]),
    __param(0, Arg("itemCode", () => Int)),
    __param(1, Arg("startDate")),
    __param(2, Arg("endDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Date,
        Date]),
    __metadata("design:returntype", Promise)
], PriceResolver.prototype, "queryItems", null);
__decorate([
    FieldResolver(() => Item),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Price]),
    __metadata("design:returntype", Promise)
], PriceResolver.prototype, "item", null);
__decorate([
    FieldResolver(() => Project),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Price]),
    __metadata("design:returntype", Promise)
], PriceResolver.prototype, "project", null);
__decorate([
    Query(() => [Price]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PriceResolver.prototype, "get_item_prices", null);
__decorate([
    Query(() => [Price]),
    __param(0, Arg("item_code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PriceResolver.prototype, "get_prices_by_item", null);
PriceResolver = __decorate([
    Resolver(Price)
], PriceResolver);
export { PriceResolver };
