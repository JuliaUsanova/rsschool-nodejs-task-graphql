import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserInputType, UserType } from './types/user.js';
import { prismaClient } from './prisma-client.js';
import { Profile, User } from '@prisma/client';
import { UserProfileInputType, UserProfileType } from './types/profile.js';

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

    createProfile: {
      type: UserProfileType,
      args: { profile: { type: new GraphQLNonNull(UserProfileInputType) } },
      resolve: async (_, { isMale, yearOfBirth, userId, memberTypeId }: Profile) => {
        try {
          return await prismaClient.profile.create({
            data: {
              isMale,
              yearOfBirth,
              userId,
              memberTypeId,
            },
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  },
});
