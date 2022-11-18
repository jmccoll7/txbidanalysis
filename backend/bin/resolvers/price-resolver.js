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
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Item } from "../entities/item-entity";
import { Project } from "../entities/project-entity";
// Define queries and updates for item_prices table
let PriceResolver = class PriceResolver {
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
