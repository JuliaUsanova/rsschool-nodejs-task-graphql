import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserInputType, UserType } from './types/user.js';
import { prismaClient } from './prisma-client.js';
import { User } from '@prisma/client';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { user: { type: new GraphQLNonNull(UserInputType) } },
      resolve: async (_, user: User) => {
        try {
          return await prismaClient.user.create({
            data: { name: user.name, balance: user.balance },
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  },
});
