import { hash, verify } from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../client.js";
import ApiError from "../exceptions/api.error.js";

dotenv.config();

class AuthService {
    async registration(login, password) {
        const candidate = await prisma.author.findUnique({
            where: {
                login,
            },
        });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь c login уже существует`);
        }
        const hashPassword = await hash(password, 3);
        const user = await prisma.author.create({
            data: {
                login,
                password: hashPassword,
            },
        });
        const tokens = await this.issuePairTokens({
            id: user.id,
            login: user.login,
        });
        await prisma.author.update({
            where: {
                login,
            },
            data: {
                refreshToken: tokens.refreshToken,
            },
        });
        return {
            ...tokens,
            ...user,
        };
    }
    async login(login, password) {
        const user = await prisma.author.findUnique({
            where: {
                login,
            },
        });
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким login не найден");
        }
        const isPassEquals = verify(user.password, password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }
        const tokens = await this.issuePairTokens({
            id: user.id,
            login: user.login,
        });
        await prisma.author.update({
            where: {
                login,
            },
            data: {
                refreshToken: tokens.refreshToken,
            },
        });
        return {
            ...tokens,
            ...user,
        };
    }
    async issuePairTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
        return {
            accessToken,
            refreshToken,
        };
    }
    validateToken(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await this.validateToken(refreshToken);
        console.log(userData);
        const tokenFromDb = await prisma.author
            .findUnique({
                where: {
                    login: userData.login,
                },
            })
            .then((data) => data.refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const tokens = await this.issuePairTokens({
            id: userData.id,
            login: userData.login,
        });
        await prisma.author.update({
            where: {
                id: userData.id,
            },
            data: {
                refreshToken: tokens.refreshToken,
            },
        });
        return { ...tokens, ...userData };
    }
}

export default new AuthService();
