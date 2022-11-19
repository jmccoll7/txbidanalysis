import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Item } from "./entities/item-entity";
import { Price } from "./entities/price-entity";
import { Project } from "./entities/project-entity";
import { User } from "./entities/user-entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Item, Price, Project, User],
  migrations: [],
  subscribers: [],
});