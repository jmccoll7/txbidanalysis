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
// Type Definition
let Book = class Book {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
Book = __decorate([
    ObjectType()
], Book);
export { Book };
// Resolver
let BookResolver = class BookResolver {
    constructor() {
        this.bookCollection = [
            {
                title: "The Awakening",
                author: "Kate Chopin",
            },
            {
                title: "City of Glass",
                author: "Paul Buttercup",
            },
        ];
    }
    books() {
        return this.bookCollection;
    }
};
__decorate([
    Query(() => [Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "books", null);
BookResolver = __decorate([
    Resolver(Book)
], BookResolver);
export { BookResolver };
