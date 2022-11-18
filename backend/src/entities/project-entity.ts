import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Price } from "./price-entity";

@Entity()
@ObjectType()
export class Project extends BaseEntity {
  @Field()
  @PrimaryColumn({ length: 128 })
  project!: string;

  @Field()
  @Column({ length: 32 })
  county!: string;

  @Field(() => Date)
  @Column({ type: "datetime" })
  bid_date!: Date;

  @OneToMany(() => Price, (price) => price.project)
  prices?: Price[];
}
