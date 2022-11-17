import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book-resolvers";
// TypeGraphQL
const schema = await buildSchema({
    resolvers: [BookResolver],
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
// Express using body-parser, cors, and Apollo
app.use("/graphql", bodyParser.json(), cors(), expressMiddleware(server));
app.listen(4000, hostname, () => {
    console.log(`GraphQL API listening on port ${port}`);
});
