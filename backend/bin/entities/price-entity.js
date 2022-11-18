var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity, ManyToOne, JoinColumn, } from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { Item } from "./item-entity";
import { Project } from "./project-entity";
// Define price table (entity)
let Price = class Price extends BaseEntity {
};
__decorate([
    Field(),
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Price.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Item, (item_code) => item_code.prices, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "item_code" }),
    __metadata("design:type", Number)
], Price.prototype, "item_code", void 0);
__decorate([
    ManyToOne(() => Project, (project) => project.prices, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "project" }),
    __metadata("design:type", String)
], Price.prototype, "project", void 0);
__decorate([
    Field(() => String),
    Column({ length: 128 }),
    __metadata("design:type", String)
], Price.prototype, "contractor", void 0);
__decorate([
    Field(() => Float),
    Column({ type: "float" }),
    __metadata("design:type", Number)
], Price.prototype, "quantity", void 0);
__decorate([
    Field(() => Float),
    Column({ type: "float" }),
    __metadata("design:type", Number)
], Price.prototype, "unit_price", void 0);
Price = __decorate([
    Entity(),
    ObjectType(),
    Unique(["item_code", "project", "contractor"])
], Price);
export { Price };
