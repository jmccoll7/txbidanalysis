var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user-entity";
import { clearRefreshToken, createAccessToken, sendRefreshToken } from "../auth";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
let LoginResponse = class LoginResponse {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    me(context) {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
            context.payload = payload;
            return User.findOneBy({ id: payload.userId });
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    async logout({ res }) {
        clearRefreshToken(res);
        return true;
    }
    users() {
        return User.find();
    }
    async register(email, password) {
        const hashedPassword = await argon2.hash(password);
        try {
            await User.insert({
                email,
                password: hashedPassword,
            });
        }
        catch (err) {
            console.log("User registration error:", err);
        }
        return true;
    }
    async revokeRefreshTokensForUser(userId) {
        await AppDataSource.getRepository(User).increment({ id: userId }, "tokenVersion", 1);
        return true;
    }
    async login(email, password, ctx) {
        const user = await User.findOneBy({ email: email });
        if (!user) {
            throw new Error("Invalid login.");
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            throw new Error("Invalid login.");
        }
        else {
            // login successful
            sendRefreshToken(ctx.res, user);
            return {
                accessToken: createAccessToken(user),
                user,
            };
        }
    }
};
__decorate([
    Query(() => User, { nullable: true }),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    Query(() => [User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("userId", () => Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    Mutation(() => LoginResponse),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    Resolver()
], UserResolver);
export { UserResolver };
