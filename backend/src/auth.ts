import { User } from "./entities/user-entity";
import jwt from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { AppContext } from "./app-context";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_PRIVATE_KEY!, {
    expiresIn: "10m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_PRIVATE_KEY!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie("jwtcookie", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export const clearRefreshToken = (res: Response) => {
  res.cookie("jwtcookie", "", {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export const sendInvalidToken = (res: Response) => {
  res.send({ ok: false, accessToken: "" });
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
