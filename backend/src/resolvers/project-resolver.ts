import { ObjectType, Field, Resolver, Query } from "type-graphql";
import { Project } from "../entities/project-entity";

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project])
  projects() {
    return Project.find();
  }
}
