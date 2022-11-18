import { ObjectType, Field, Resolver, Query } from "type-graphql";
import { Project } from "../entities/project-entity";

@ObjectType()
class PaginatedProjects {
  @Field(() => [Project])
  projects!: Project[];
  @Field()
  hasMore!: boolean;
}

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project])
  projects() {
    return Project.find();
  }
}
