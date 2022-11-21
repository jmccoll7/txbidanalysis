import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user-entity";
import { AppContext } from "../app-context";
import { clearRefreshToken, createAccessToken, isAuth, sendInvalidToken, sendRefreshToken } from "../auth";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
  @Field(() => User)
  user!: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: AppContext) {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(" ")[1];
      const payload: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!
      );
      context.payload = payload as any;
      return User.findOneBy({ id: payload.userId });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() {res}: AppContext
  ) {
    clearRefreshToken(res);
    return true
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await argon2.hash(password);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log("User registration error:", err);
    }
    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await AppDataSource.getRepository(User).increment(
      { id: userId },
      "tokenVersion",
      1
    );
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: AppContext
  ): Promise<LoginResponse> {
    const user = await User.findOneBy({ email: email });
    if (!user) {
      throw new Error("Invalid login.");
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      throw new Error("Invalid login.");
    } else {
      // login successful
      sendRefreshToken(ctx.res, user);
      return {
        accessToken: createAccessToken(user),
        user,
      };
    }
  }
}
