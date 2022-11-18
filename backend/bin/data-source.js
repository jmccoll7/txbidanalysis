import "reflect-metadata";
import { DataSource } from "typeorm";
import { Item } from "./entities/item-entity";
import { Price } from "./entities/price-entity";
import { Project } from "./entities/project-entity";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Item, Price, Project],
    migrations: [],
    subscribers: [],
});
