var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, Resolver, Query } from "type-graphql";
import { Item } from "../entities/item-entity";
let PaginatedItems = class PaginatedItems {
};
__decorate([
    Field(() => [Item]),
    __metadata("design:type", Array)
], PaginatedItems.prototype, "items", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], PaginatedItems.prototype, "hasMore", void 0);
PaginatedItems = __decorate([
    ObjectType()
], PaginatedItems);
let ItemResolver = class ItemResolver {
    items() {
        return Item.find();
    }
};
__decorate([
    Query(() => [Item]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "items", null);
ItemResolver = __decorate([
    Resolver(Item)
], ItemResolver);
export { ItemResolver };
