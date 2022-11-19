import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { ItemResolver } from "./resolvers/item-resolver";
import { PriceResolver } from "./resolvers/price-resolver";
import { ProjectResolver } from "./resolvers/project-resolver";
import { UserResolver } from "./resolvers/user-resolver";
import { __prod__ } from "./constants";
// TypeORM
AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
// TypeGraphQL
const schema = await buildSchema({
    resolvers: [UserResolver, ItemResolver, PriceResolver, ProjectResolver],
});
// ApolloServer
const server = new ApolloServer({
    schema,
    plugins: !__prod__
        ? [ApolloServerPluginLandingPageGraphQLPlayground()]
        : undefined,
});
await server.start();
// Express
const port = 4000;
const hostname = "localhost";
const app = express();
// Redis Client
const redisClient = createClient({
    legacyMode: true,
});
redisClient.connect().catch(console.error);
// Express-Session with Redis-Connect
const RedisStore = connectRedis(session);
app.use(session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "ajijfopsdppfjiweriufwqiorjfnksdlkjj",
    resave: false,
    name: "sessioncookie",
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        maxAge: 1000 * 60 * 60, // 1 hour
    },
}));
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};
app.set("trust proxy", !__prod__);
// Express using body-parser, cors, and Apollo
app.use("/graphql", bodyParser.json(), cors(corsOptions), expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
}));
app.listen(port, hostname, () => {
    console.log(`GraphQL API listening on port ${port}`);
});
