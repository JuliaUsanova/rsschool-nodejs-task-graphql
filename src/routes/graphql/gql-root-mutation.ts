import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserInputType, UserType } from './types/user.js';
import { prismaClient } from './prisma-client.js';
import { Post, Profile, User } from '@prisma/client';
import { UserProfileInputType, UserProfileType } from './types/profile.js';
import { PostInputType, PostType } from './types/post.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    createUser: {
      type: UserType,
      args: { dto: { type: new GraphQLNonNull(UserInputType) } },
      resolve: async (_, { dto }: { dto: User} ) => {
        try {
          return await prismaClient.user.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    createProfile: {
      type: UserProfileType,
      args: { dto: { type: new GraphQLNonNull(UserProfileInputType) } },
      resolve: async (_, { dto }: { dto: Profile }) => {
        try {
          return await prismaClient.profile.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(PostInputType) } },
      resolve: async (_, { dto }: { dto: Post }) => {
        try {
          return await prismaClient.post.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  },
});
