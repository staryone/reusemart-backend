import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { v4 as uuid } from "uuid";

const get = async (email) => {
    return await prismaClient.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
            password: true,
        },
    });
};

const create = async (user) => {
    return prismaClient.user.create({
        data: user,
        select: {
            id_user: true,
            email: true,
        },
    });
};

const count = async (email) => {
    return prismaClient.user.count({
        where: {
            email: email,
        },
    });
};

const updateToken = async (email) => {
    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token,
        },
        where: {
            email: email,
        },
        select: {
            token: true,
        },
    });
};

export default { create, get, count, updateToken };
