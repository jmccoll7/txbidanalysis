import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createAccessToken, sendInvalidToken, sendRefreshToken } from "./auth";
import { __prod__ } from "./constants";
import { AppDataSource } from "./data-source";
import { User } from "./entities/user-entity";
import { ItemResolver } from "./resolvers/item-resolver";
import { PriceResolver } from "./resolvers/price-resolver";
import { ProjectResolver } from "./resolvers/project-resolver";
import { UserResolver } from "./resolvers/user-resolver";
dotenv.config();
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

});
await server.start();
// Express
const port = 4000;
const app = express();
// Cookie-Parser
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};
app.set("trust proxy", !__prod__);
// Express using body-parser, cors, and Apollo
app.use("/graphql", bodyParser.json(), cors(corsOptions), expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
}));
app.post("/refresh_token", cors(corsOptions), async (req, res) => {
    const token = req.cookies.jwtcookie;
    if (!token) {
        return sendInvalidToken(res);
    }
    let payload = null;
    try {
        payload = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    }
    catch (err) {
        console.log(err);
        return sendInvalidToken(res);
    }
    // Token valid. Send access token.
    const user = await User.findOneBy({ id: payload.userId });
    if (!user) {
        return sendInvalidToken(res);
    }
    if (user.tokenVersion !== payload.tokenVersion) {
        sendInvalidToken(res);
    }
    sendRefreshToken(res, user);
    return res.send({ ok: true, accessToken: createAccessToken(user) });
});
app.listen(port, () => {
    console.log(`GraphQL API listening on port ${port}`);
});
