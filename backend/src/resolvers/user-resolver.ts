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
import {
  createAccessToken,
  createRefreshToken,
  isAuth,
  sendRefreshToken,
} from "../auth";
import { AppDataSource } from "../data-source";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  me() {
    return "me";
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: AppContext) {
    return `User ID: ${payload!.userId}`;
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
      };
    }
  }
}
