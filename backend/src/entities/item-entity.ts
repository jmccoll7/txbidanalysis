import { ObjectType, Field } from "type-graphql"
import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Price } from "./price-entity";

@Entity()
@ObjectType()
export class Item extends BaseEntity {

  @Field()
  @PrimaryColumn()
  item_code!: number

  @Field()
  @Column({length: 128})
  item_description!: string;

  @Field()
  @Column({length: 8})
  item_unit!: string;

  @OneToMany(() => Price, (price) => price.item_code)
  prices?: Price[]
}