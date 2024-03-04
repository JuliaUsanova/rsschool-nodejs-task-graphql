import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post } from '@prisma/client';
import { UserType } from './user.js';
import { prismaClient } from '../prisma-client.js';

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: new GraphQLNonNull(UUIDType)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(UUIDType)},
        author: {
            type: UserType,
            resolve: async (_, {authorId}: Post) => {
                try {
                    return await prismaClient.user.findFirst({where: {id: authorId}})
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        }
    })
})

export const PostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(UUIDType)}
    })
})

export const PostChangeInputType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(UUIDType)}
    })
})