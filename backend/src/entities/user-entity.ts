import { ObjectType, Field, Int } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Entity("user")
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column("int", { default: 0 })
  tokenVersion!: number;
}
