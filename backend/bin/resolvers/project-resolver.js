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
import { Project } from "../entities/project-entity";
let PaginatedProjects = class PaginatedProjects {
};
__decorate([
    Field(() => [Project]),
    __metadata("design:type", Array)
], PaginatedProjects.prototype, "projects", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], PaginatedProjects.prototype, "hasMore", void 0);
PaginatedProjects = __decorate([
    ObjectType()
], PaginatedProjects);
let ProjectResolver = class ProjectResolver {
    projects() {
        return Project.find();
    }
};
__decorate([
    Query(() => [Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "projects", null);
ProjectResolver = __decorate([
    Resolver(Project)
], ProjectResolver);
export { ProjectResolver };
