import { User } from "./entities/user-entity";
import jwt from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { AppContext } from "./app-context";

export const createAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_PRIVATE_KEY!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_PRIVATE_KEY!, {
    expiresIn: "7d",
  });
};

export const isAuth: Middleware<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("User not authenticated.");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authorized");
  }
  return next();
};
