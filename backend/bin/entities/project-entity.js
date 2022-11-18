var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Price } from "./price-entity";
let Project = class Project extends BaseEntity {
};
__decorate([
    Field(),
    PrimaryColumn({ length: 128 }),
    __metadata("design:type", String)
], Project.prototype, "project", void 0);
__decorate([
    Field(),
    Column({ length: 32 }),
    __metadata("design:type", String)
], Project.prototype, "county", void 0);
__decorate([
    Field(() => Date),
    Column({ type: "datetime" }),
    __metadata("design:type", Date)
], Project.prototype, "bid_date", void 0);
__decorate([
    OneToMany(() => Price, (price) => price.project),
    __metadata("design:type", Array)
], Project.prototype, "prices", void 0);
Project = __decorate([
    Entity(),
    ObjectType()
], Project);
export { Project };
