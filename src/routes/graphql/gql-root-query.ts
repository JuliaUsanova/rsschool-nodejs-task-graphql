import {GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql";
import { UserType } from "./types/user.js";
import { UUIDType } from "./types/uuid.js";
import { prismaClient } from "./prisma-client.js";
import { User } from '@prisma/client';

export const rootQuery = new GraphQLObjectType({
    name: 'Query',

    fields: {

        user: {
            type: UserType,
            args: {id: {type: new GraphQLNonNull(UUIDType)}},
            resolve: async (_, { id }: User) => {
                try {
                    return await prismaClient.user.findFirst({where: {id}})
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: async (_) => {
                try {
                    return await prismaClient.user.findMany()
                } catch (e) {
                    console.error(e);
                    return []
                }
            }
        }
    }
}) ;