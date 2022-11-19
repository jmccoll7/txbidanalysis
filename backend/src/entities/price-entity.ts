import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { Item } from "./item-entity";
import { Project } from "./project-entity";

// Define price table (entity)
@Entity()
@ObjectType()
@Unique(["item_code", "project", "contractor"])
export class Price extends BaseEntity {
  // Unique constraint for "item_code, project, contractor" columns
  // Columns:
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Item, (item_code) => item_code.prices, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "item_code" })
  item_code!: number;

  @ManyToOne(() => Project, (project) => project.prices, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project" })
  project!: string;

  @Field(() => String)
  @Column({ length: 128 })
  contractor!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  quantity!: number;

  @Field(() => Float)
  @Column({ type: "float" })
  unit_price!: number;
}
