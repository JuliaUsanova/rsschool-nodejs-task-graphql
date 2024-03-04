import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { prismaClient } from './prisma-client.js';
import { Post, User } from '@prisma/client';
import { PostType } from './types/post.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',

  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: User) => {
        try {
          return await prismaClient.user.findFirst({ where: { id } });
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
          return await prismaClient.user.findMany();
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    },

    post: {
      type: PostType,
      resolve: async (_, { id }: Post) => {
        try {
          return await prismaClient.post.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  },
});
