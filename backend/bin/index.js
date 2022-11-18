import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { ItemResolver } from "./resolvers/item-resolver";
import { PriceResolver } from "./resolvers/price-resolver";
import { ProjectResolver } from "./resolvers/project-resolver";
// TypeORM
AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
// TypeGraphQL
const schema = await buildSchema({
    resolvers: [ItemResolver, PriceResolver, ProjectResolver, ItemResolver],
});
// ApolloServer
const server = new ApolloServer({
    schema,
});
await server.start();
// Express
const port = 4000;
const hostname = "localhost";
const app = express();
app.get("/", (req, res) => {
    res.send('App Up! 👍');
});
app.get("/dog", (req, res) => {
    res.json({
        'name': 'Bruno',
        'age': '5',
        'image': 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
    });
});
// Express using body-parser, cors, and Apollo
app.use("/graphql", bodyParser.json(), cors(), expressMiddleware(server));
app.listen(port, hostname, () => {
    console.log(`GraphQL API listening on port ${port}`);
});
